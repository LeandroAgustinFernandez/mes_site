const MONTHS = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
]

export function formatEventDate(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  const day = date.getUTCDate()
  const month = MONTHS[date.getUTCMonth()]
  const year = date.getUTCFullYear()
  return `${day} de ${month} de ${year}`
}

export function formatShortDate(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  const day = date.getUTCDate().toString().padStart(2, '0')
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0')
  return `${day}/${month}/${date.getUTCFullYear()}`
}