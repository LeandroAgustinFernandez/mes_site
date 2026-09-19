# Movimiento es Vida · Escuela de Shaolin Kung Fu

Sitio web institucional de la escuela **Movimiento es Vida** (运动就是生命), escuela de Shaolin Kung Fu con sedes en Lomas de Zamora, Temperley y Remedios de Escalada (Buenos Aires, Argentina).

Construido con **React + Vite + TypeScript**, estilos en **CSS puro con variables** (sin dependencias de UI) y una única página con navegación por anclas.

## Comandos

```bash
npm install          # instala dependencias
npm run dev          # servidor de desarrollo
npm run build        # build de producción (dist/)
npm run preview      # previsualiza el build
npm run optimize:images  # redimensiona y convierte a WebP las imágenes de src/assets (galería, hero, secciones y logo)
```

## Sistema de eventos (Supabase)

El sitio incluye una **sección pública de Eventos** y un **panel administrativo** en `/admin` (login + gestión de eventos: crear, editar, eliminar, subir imagen). Los datos e imágenes se almacenan en **Supabase** (PostgreSQL + Auth + Storage) con Row Level Security.

### Variables de entorno

Copiar `.env.example` a `.env` y completar:

```bash
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=...
```

`.env` está en `.gitignore` y **no debe subirse**. Para el deploy productivo, las mismas dos variables deben estar configuradas en **Netlify** (Site settings → Environment variables) y como **secretos en el repositorio de GitHub** (Settings → Secrets and variables → Actions) para que el workflow de GitHub Pages compile correctamente.

### Setup en Supabase

1. Crear el usuario administrador en **Supabase → Authentication → Users** (no compartir la contraseña).
2. Ejecutar el script `supabase/schema.sql` en el **SQL Editor**. Es idempotente: crea la tabla `events`, la tabla `admin_users`, activa RLS, configura las políticas y crea el bucket `event-images`.
3. El email del administrador se define en el script dentro de `admin_users`.

### Rutas

```text
/                sitio público (incluye la sección Eventos)
/admin           panel (requiere autenticación; redirige a /admin/login)
/admin/login     pantalla de inicio de sesión
/admin/events/new        crear evento
/admin/events/:id/edit   editar evento
```

## Imágenes

Las fotografías del sitio se guardan en WebP redimensionado (`src/assets/gallery/*.webp`). Para agregar fotos nuevas o re-optimizarlas: colocá los archivos originales en `src/assets/gallery/` y ejecutá `npm run optimize:images`. Las imágenes de eventos se optimizan en el frontend (a WebP) antes de subirse a Supabase Storage.

### Estructura

```
src/
├── assets/          # imágenes (logo, hero, galería)
├── components/      # componentes reutilizables (Header, Footer, EventCard, ...)
├── components/admin # shell y route protection del panel
├── sections/        # secciones de la página (Hero, About, Training, Events, ...)
├── pages/admin/     # Login, Dashboard, EventForm
├── services/        # capa de acceso a Supabase (auth, events) + image.ts
├── data/            # schoolData.ts (toda la info modificable) + galleryImages.ts
├── hooks/           # useReveal (fade-in al scroll)
├── styles/          # variables.css (paleta) + global.css
├── utils/           # format.ts (formato de fechas)
├── App.tsx          # rutas (/ público + /admin/*)
└── main.tsx
```

## Edición de contenido

Toda la información institucional (nombre, teléfonos, WhatsApp, Instagram, sedes, horarios, maestros, disciplinas y textos) se encuentra centralizada en `src/data/schoolData.ts`. La paleta de colores se configura en `src/styles/variables.css`.