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

## Imágenes

Las fotografías del sitio se guardan en WebP redimensionado (`src/assets/gallery/*.webp`). Para agregar fotos nuevas o re-optimizarlas: colocá los archivos originales en `src/assets/gallery/` y ejecutá `npm run optimize:images`.

## Estructura

```
src/
├── assets/          # imágenes (logo, hero, galería)
├── components/      # componentes reutilizables (Header, Footer, Button, ...)
├── sections/        # secciones de la página (Hero, About, Training, ...)
├── data/            # schoolData.ts (toda la info modificable) + galleryImages.ts
├── hooks/           # useReveal (fade-in al scroll)
├── styles/          # variables.css (paleta) + global.css
├── App.tsx
└── main.tsx
```

## Edición de contenido

Toda la información institucional (nombre, teléfonos, WhatsApp, Instagram, sedes, horarios, maestros, disciplinas y textos) se encuentra centralizada en `src/data/schoolData.ts`. La paleta de colores se configura en `src/styles/variables.css`.