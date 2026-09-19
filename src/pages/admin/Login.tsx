import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { signIn } from '../../services/supabase/auth'
import { supabaseConfigured } from '../../services/supabase/client'
import styles from './Login.module.css'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    document.title = 'Iniciar sesión · Movimiento es Vida'
  }, [])

  const from = (location.state as { from?: { pathname?: string } } | null)?.from
    ?.pathname
  const redirectTo = from && from.startsWith('/admin') ? from : '/admin'

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    setBusy(true)
    try {
      await signIn(email.trim(), password)
      navigate(redirectTo, { replace: true })
    } catch {
      setError('Email o contraseña incorrectos. Verificá tus datos e intentá nuevamente.')
    } finally {
      setBusy(false)
    }
  }

  if (!supabaseConfigured) {
    return (
      <div className={styles.wrap}>
        <p className={styles.error} role="alert">
          El panel aún no está configurado. Completá las variables de entorno de Supabase.
        </p>
        <Link to="/" className={styles.link}>
          Volver al sitio
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.wrap}>
      <form className={styles.card} onSubmit={handleSubmit} noValidate>
        <h1 className={styles.title}>Administración</h1>
        <p className={styles.subtitle}>Ingresá para gestionar los eventos.</p>

        <label className={styles.field}>
          <span className={styles.label}>Email</span>
          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            disabled={busy}
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Contraseña</span>
          <input
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            disabled={busy}
          />
        </label>

        {error && <p className={styles.error} role="alert">{error}</p>}

        <button
          type="submit"
          className={styles.submit}
          disabled={busy}
        >
          {busy ? 'Ingresando…' : 'Iniciar sesión'}
        </button>

        <Link to="/" className={styles.link}>
          Volver al sitio
        </Link>
      </form>
    </div>
  )
}