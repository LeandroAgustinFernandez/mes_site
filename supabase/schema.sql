-- ============================================================================
-- Movimiento es Vida · Sistema de eventos
-- Script idempotente: puede ejecutarse más de una vez sin romper nada.
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. Tabla de eventos
-- ----------------------------------------------------------------------------
create table if not exists public.events (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text not null,
  image_url   text,
  created_at  timestamptz not null default now(),
  published   boolean not null default true
);

-- Asegura columnas si la tabla ya existía creada a mano
alter table public.events
  add column if not exists title       text not null,
  add column if not exists description text not null,
  add column if not exists image_url   text,
  add column if not exists created_at  timestamptz not null default now(),
  add column if not exists published   boolean not null default true;

-- ----------------------------------------------------------------------------
-- 2. Tabla de administradores (para RLS)
-- ----------------------------------------------------------------------------
create table if not exists public.admin_users (
  email text primary key
);

insert into public.admin_users (email) values ('leandroa.fernandez@gmail.com')
on conflict (email) do nothing;

-- ----------------------------------------------------------------------------
-- 3. Row Level Security
-- ----------------------------------------------------------------------------
alter table public.events enable row level security;

-- Lectura pública: solo eventos publicados
drop policy if exists "events_select_published" on public.events;
create policy "events_select_published" on public.events
  for select to anon, authenticated
  using (published = true);

-- Las políticas de administración de events usan el claim "sub" (id del usuario
-- en auth.users), el mismo criterio que Storage: el claim "email" no está
-- garantizado en todos los contextos. El listado de administradores sale de
-- admin_users → auth.users.
do $$
declare
  admin_list text;
begin
  select string_agg(quote_literal(u.id::text) || '::uuid', ', ' order by u.id::text)
    into admin_list
  from auth.users u
  where exists (
    select 1 from public.admin_users a where a.email = u.email
  );

  if admin_list is null then
    raise exception 'No se encontró ningún email de admin_users en auth.users. Verificá que el usuario exista y que su email esté en public.admin_users.';
  end if;

  -- Administración: el admin autenticado lee todos los eventos
  execute format('drop policy if exists "events_select_admin" on public.events');
  execute format(
    'create policy "events_select_admin" on public.events
       for select to authenticated
       using (
         (auth.jwt() ->> %L)::uuid = any (ARRAY[%s])
       )',
    'sub', admin_list
  );

  -- Administración: crear
  execute format('drop policy if exists "events_insert_admin" on public.events');
  execute format(
    'create policy "events_insert_admin" on public.events
       for insert to authenticated
       with check (
         (auth.jwt() ->> %L)::uuid = any (ARRAY[%s])
       )',
    'sub', admin_list
  );

  -- Administración: modificar
  execute format('drop policy if exists "events_update_admin" on public.events');
  execute format(
    'create policy "events_update_admin" on public.events
       for update to authenticated
       using (
         (auth.jwt() ->> %L)::uuid = any (ARRAY[%s])
       )
       with check (
         (auth.jwt() ->> %L)::uuid = any (ARRAY[%s])
       )',
    'sub', admin_list, 'sub', admin_list
  );

  -- Administración: eliminar
  execute format('drop policy if exists "events_delete_admin" on public.events');
  execute format(
    'create policy "events_delete_admin" on public.events
       for delete to authenticated
       using (
         (auth.jwt() ->> %L)::uuid = any (ARRAY[%s])
       )',
    'sub', admin_list
  );
end $$;

-- Permisos de tabla (RLS aplica encima)
grant usage on schema public to anon, authenticated;
grant select on public.events to anon;
grant select, insert, update, delete on public.events to authenticated;
grant select on public.admin_users to authenticated;

-- ----------------------------------------------------------------------------
-- 4. Storage: bucket de imágenes de eventos
-- ----------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('event-images', 'event-images', true)
on conflict (id) do update set public = true;

-- Lectura pública de las imágenes
drop policy if exists "event_images_public_read" on storage.objects;
create policy "event_images_public_read" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'event-images');

-- Las políticas de escritura se crean para los roles que realmente ejecutan el
-- INSERT: "authenticated" (PostgREST/Storage clásico) y, en proyectos recientes,
-- "supabase_storage_admin" (el worker de Storage con RLS activo).
-- El chequeo de administrador se hace contra el claim "sub" (id del usuario en
-- auth.users): es el único claim que Storage garantiza propagar; "email" suele
-- venir vacío en el contexto del worker.
do $$
declare
  admin_list text;
  storage_role_exists boolean;
  target_roles text;
begin
  select string_agg(quote_literal(u.id::text) || '::uuid', ', ' order by u.id::text)
    into admin_list
  from auth.users u
  where exists (
    select 1 from public.admin_users a where a.email = u.email
  );

  if admin_list is null then
    raise exception 'No se encontró ningún email de admin_users en auth.users. Verificá que el usuario exista y que su email esté en public.admin_users.';
  end if;

  select exists (select 1 from pg_roles where rolname = 'supabase_storage_admin')
    into storage_role_exists;

  target_roles := case
    when storage_role_exists then 'authenticated, supabase_storage_admin'
    else 'authenticated'
  end;

  -- Lectura para el worker de Storage (RETURNING interno del upload)
  if storage_role_exists then
    drop policy if exists "event_images_public_read_storage_role" on storage.objects;
    execute format(
      'create policy "event_images_public_read_storage_role" on storage.objects
         for select to supabase_storage_admin
         using (bucket_id = %L)',
      'event-images'
    );
  end if;

  -- Subida: solo el administrador
  execute format('drop policy if exists "event_images_admin_insert" on storage.objects');
  execute format('drop policy if exists "event_images_admin_insert_storage_role" on storage.objects');
  execute format(
    'create policy "event_images_admin_insert" on storage.objects
       for insert to %s
       with check (
         bucket_id = %L
         and (auth.jwt() ->> %L)::uuid = any (ARRAY[%s])
       )',
    target_roles, 'event-images', 'sub', admin_list
  );

  -- Reemplazo: solo el administrador
  execute format('drop policy if exists "event_images_admin_update" on storage.objects');
  execute format('drop policy if exists "event_images_admin_update_storage_role" on storage.objects');
  execute format(
    'create policy "event_images_admin_update" on storage.objects
       for update to %s
       using (
         bucket_id = %L
         and (auth.jwt() ->> %L)::uuid = any (ARRAY[%s])
       )
       with check (
         bucket_id = %L
         and (auth.jwt() ->> %L)::uuid = any (ARRAY[%s])
       )',
    target_roles, 'event-images', 'sub', admin_list, 'event-images', 'sub', admin_list
  );

  -- Eliminación: solo el administrador
  execute format('drop policy if exists "event_images_admin_delete" on storage.objects');
  execute format('drop policy if exists "event_images_admin_delete_storage_role" on storage.objects');
  execute format(
    'create policy "event_images_admin_delete" on storage.objects
       for delete to %s
       using (
         bucket_id = %L
         and (auth.jwt() ->> %L)::uuid = any (ARRAY[%s])
       )',
    target_roles, 'event-images', 'sub', admin_list
  );
end $$;