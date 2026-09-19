function detectBasename(): string {
  const path = window.location.pathname
  const idx = path.indexOf('/admin')
  if (idx >= 0) return path.slice(0, idx).replace(/\/$/, '')
  if (path === '/' || path === '') return ''
  const base = path.replace(/\/+$/, '')
  return base === 'index.html' ? '' : base
}

export const APP_BASENAME = detectBasename()