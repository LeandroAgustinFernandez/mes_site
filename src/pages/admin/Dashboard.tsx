import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AdminShell } from '../../components/admin/AdminShell'
import { Icon } from '../../components/Icon'
import { signOut } from '../../services/supabase/auth'
import { getAllEvents, deleteEvent } from '../../services/supabase/events'
import { formatShortDate } from '../../utils/format'
import type { EventItem } from '../../types/event'
import styles from './Dashboard.module.css'

export function Dashboard() {
  const [items, setItems] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [busyDelete, setBusyDelete] = useState(false)
  const [confirmingId, setConfirmingId] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Administración · Movimiento es Vida'
    getAllEvents()
      .then(setItems)
      .catch(() => setError('No se pudieron cargar los eventos. Intentá nuevamente.'))
      .finally(() => setLoading(false))
  }, [])

  async function handleDelete(event: EventItem) {
    setBusyDelete(true)
    setError(null)
    try {
      await deleteEvent(event)
      setItems((current) => current.filter((i) => i.id !== event.id))
      setConfirmingId(null)
    } catch {
      setError('No se pudo eliminar el evento. Intentá nuevamente.')
    } finally {
      setBusyDelete(false)
    }
  }

  async function handleLogout() {
    await signOut()
    navigate('/admin/login', { replace: true })
  }

  return (
    <AdminShell title="Eventos">
      <div className={styles.toolbar}>
        <Link to="/admin/events/new" className={styles.primary}>
          <Icon name="plus" size={18} /> Nuevo evento
        </Link>
        <div className={styles.secondary}>
          <Link to="/" className={styles.secondaryBtn}>
            Ver sitio
          </Link>
          <button type="button" className={styles.secondaryBtn} onClick={handleLogout}>
            <Icon name="logout" size={18} /> Cerrar sesión
          </button>
        </div>
      </div>

      {error && <p className={styles.error} role="alert">{error}</p>}

      {loading ? (
        <p className={styles.state}>Cargando eventos…</p>
      ) : !loading && items.length === 0 ? (
        <div className={styles.state}>
          Todavía no hay eventos. Creá el primero desde “Nuevo evento”.
        </div>
      ) : (
        <ul className={styles.list}>
          {items.map((event) => (
            <li key={event.id} className={styles.row}>
              <div className={styles.rowInfo}>
                <span className={styles.rowTitle}>{event.title}</span>
                <span className={styles.rowMeta}>
                  {formatShortDate(event.created_at)} ·{' '}
                  {event.published ? (
                    <span className={styles.published}>Publicado</span>
                  ) : (
                    <span className={styles.draft}>Borrador</span>
                  )}
                </span>
              </div>
              <div className={styles.rowActions}>
                <Link
                  to={`/admin/events/${event.id}/edit`}
                  className={styles.action}
                  aria-label={`Editar ${event.title}`}
                >
                  <Icon name="edit" size={18} />
                </Link>
                <button
                  type="button"
                  className={`${styles.action} ${styles.danger}`}
                  onClick={() => setConfirmingId(event.id)}
                  aria-label={`Eliminar ${event.title}`}
                >
                  <Icon name="trash" size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {confirmingId && (
        <div
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-dialog-title"
        >
          <div className={styles.modal}>
            <h2 id="confirm-dialog-title" className={styles.modalTitle}>
              ¿Querés eliminar este evento?
            </h2>
            <p className={styles.modalText}>Esta acción no se puede deshacer.</p>
            <div className={styles.modalActions}>
              <button
                type="button"
                className={styles.ghostBtn}
                onClick={() => setConfirmingId(null)}
                disabled={busyDelete}
              >
                Cancelar
              </button>
              <button
                type="button"
                className={styles.dangerBtn}
                onClick={() => {
                  const event = items.find((i) => i.id === confirmingId)
                  if (event) void handleDelete(event)
                }}
                disabled={busyDelete}
              >
                {busyDelete ? 'Eliminando…' : 'Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  )
}