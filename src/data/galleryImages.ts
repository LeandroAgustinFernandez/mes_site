export interface GalleryItem {
  src: string
  alt: string
}

const modules = import.meta.glob('../assets/gallery/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
})

const files = Object.values(modules) as string[]

export const galleryItems: GalleryItem[] = files.map((src, index) => ({
  src,
  alt: `Entrenamiento y examen de Shaolin Kung Fu · Movimiento es Vida · Imagen ${index + 1}`,
}))