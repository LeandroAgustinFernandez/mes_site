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

-- Administración: el admin autenticado lee todos los eventos
drop policy if exists "events_select_admin" on public.events;
create policy "events_select_admin" on public.events
  for select to authenticated
  using (
    (select 1 from public.admin_users where email = (auth.jwt() ->> 'email')) = 1
  );

-- Administración: crear
drop policy if exists "events_insert_admin" on public.events;
create policy "events_insert_admin" on public.events
  for insert to authenticated
  with check (
    (select 1 from public.admin_users where email = (auth.jwt() ->> 'email')) = 1
  );

-- Administración: modificar
drop policy if exists "events_update_admin" on public.events;
create policy "events_update_admin" on public.events
  for update to authenticated
  using (
    (select 1 from public.admin_users where email = (auth.jwt() ->> 'email')) = 1
  )
  with check (
    (select 1 from public.admin_users where email = (auth.jwt() ->> 'email')) = 1
  );

-- Administración: eliminar
drop policy if exists "events_delete_admin" on public.events;
create policy "events_delete_admin" on public.events
  for delete to authenticated
  using (
    (select 1 from public.admin_users where email = (auth.jwt() ->> 'email')) = 1
  );

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

-- Subida: solo el administrador
drop policy if exists "event_images_admin_insert" on storage.objects;
create policy "event_images_admin_insert" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'event-images'
    and (select 1 from public.admin_users where email = (auth.jwt() ->> 'email')) = 1
  );

-- Reemplazo: solo el administrador
drop policy if exists "event_images_admin_update" on storage.objects;
create policy "event_images_admin_update" on storage.objects
  for update to authenticated
  using (
    bucket_id = 'event-images'
    and (select 1 from public.admin_users where email = (auth.jwt() ->> 'email')) = 1
  );

-- Eliminación: solo el administrador
drop policy if exists "event_images_admin_delete" on storage.objects;
create policy "event_images_admin_delete" on storage.objects
  for delete to authenticated
  using (
    bucket_id = 'event-images'
    and (select 1 from public.admin_users where email = (auth.jwt() ->> 'email')) = 1
  );