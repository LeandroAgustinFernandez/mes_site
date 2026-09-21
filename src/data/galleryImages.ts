export interface GalleryItem {
  src: string
  alt: string
  credit?: string
}

const modules = import.meta.glob('../assets/gallery/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
})

export const credits: Record<string, string> = {
  'gallery-01.webp': 'Tatiana Lopez',
  'gallery-06.webp': 'Tatiana Lopez',
  'gallery-07.webp': 'Tatiana Lopez',
  'gallery-11.webp': 'Tatiana Lopez',
  'gallery-12.webp': 'Tatiana Lopez',
}

export const galleryItems: GalleryItem[] = Object.entries(modules).map(
  ([path, src], index) => {
    const file = path.split('/').pop() ?? ''
    return {
      src: src as string,
      alt: `Entrenamiento y examen de Shaolin Kung Fu · Movimiento es Vida · Imagen ${index + 1}`,
      credit: credits[file],
    }
  },
)