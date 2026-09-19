import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { getSessionUser, onAuthStateChange } from '../../services/supabase/auth'
import styles from './AdminShell.module.css'

export interface AdminShellProps {
  title: string
  children: ReactNode
}

export function AdminShell({ title, children }: AdminShellProps) {
  return (
    <div className={styles.shell}>
      <header className={styles.topbar}>
        <div className={styles.brand}>
          <span className={styles.brandName}>Movimiento es Vida</span>
          <span className={styles.brandSub}>Administración</span>
        </div>
      </header>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.body}>{children}</div>
    </div>
  )
}

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const [state, setState] = useState<'checking' | 'authed' | 'guest'>('checking')
  const location = useLocation()

  useEffect(() => {
    let mounted = true
    getSessionUser()
      .then((user) => {
        if (mounted) setState(user ? 'authed' : 'guest')
      })
      .catch(() => {
        if (mounted) setState('guest')
      })
    const unsubscribe = onAuthStateChange((signedIn) => {
      if (mounted) setState(signedIn ? 'authed' : 'guest')
    })
    return () => {
      mounted = false
      unsubscribe()
    }
  }, [])

  if (state === 'checking') {
    return <div className={styles.loading}>Cargando…</div>
  }

  if (state === 'guest') {
    return <Navigate to="/admin/login" replace state={{ from: location }} />
  }

  return <>{children}</>
}