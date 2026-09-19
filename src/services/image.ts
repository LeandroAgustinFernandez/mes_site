export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
export const MAX_INPUT_BYTES = 8 * 1024 * 1024
export const MAX_DIMENSION = 1200
const WEBP_QUALITY = 0.8

export interface ImageValidation {
  ok: boolean
  message?: string
}

export function validateImage(file: File): ImageValidation {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return {
      ok: false,
      message: 'El archivo debe ser JPG, PNG o WEBP.',
    }
  }
  if (file.size > MAX_INPUT_BYTES) {
    return {
      ok: false,
      message: 'La imagen es demasiado grande (máximo 8 MB). Elegí otra o comprimila antes.',
    }
  }
  return { ok: true }
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(new Error('No se pudo leer la imagen.'))
    reader.readAsDataURL(file)
  })
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('No se pudo leer la imagen.'))
    img.src = src
  })
}

export async function optimizeImage(file: File): Promise<Blob> {
  const dataUrl = await fileToDataUrl(file)
  const img = await loadImage(dataUrl)
  const scale = Math.min(1, MAX_DIMENSION / Math.max(img.width, img.height))
  const width = Math.max(1, Math.round(img.width * scale))
  const height = Math.max(1, Math.round(img.height * scale))

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('No se pudo procesar la imagen.')
  ctx.drawImage(img, 0, 0, width, height)

  const blob: Blob | null = await new Promise((resolve) => {
    canvas.toBlob(resolve, 'image/webp', WEBP_QUALITY)
  })
  if (!blob) throw new Error('No se pudo procesar la imagen.')
  return blob
}