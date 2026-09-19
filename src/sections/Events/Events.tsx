import { useEffect, useState } from 'react'
import { SectionTitle } from '../../components/SectionTitle/SectionTitle'
import { EventCard } from '../../components/EventCard/EventCard'
import { events } from '../../data/schoolData'
import { getPublishedEvents } from '../../services/supabase/events'
import { supabaseConfigured } from '../../services/supabase/client'
import { useReveal } from '../../hooks/useReveal'
import type { EventItem } from '../../types/event'
import styles from './Events.module.css'

export function Events() {
  const [items, setItems] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(supabaseConfigured)
  const [error, setError] = useState(false)
  const ref = useReveal<HTMLDivElement>()

  useEffect(() => {
    let mounted = true
    if (!supabaseConfigured) return
    getPublishedEvents()
      .then((result) => {
        if (!mounted) return
        setItems(result)
      })
      .catch(() => {
        if (!mounted) return
        setError(true)
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })
    return () => {
      mounted = false
    }
  }, [])

  return (
    <section id="eventos" className="section section--alt">
      <div className="container">
        <SectionTitle kicker="Eventos" title={events.title} subtitle={events.subtitle} />

        {!supabaseConfigured ? (
          <p className={styles.notConfigured}>
            La sección de eventos estará disponible próximamente.
          </p>
        ) : loading ? (
          <p className={styles.notConfigured}>Cargando eventos…</p>
        ) : error ? (
          <p className={styles.error} role="alert">
            No se pudieron cargar los eventos. Intentá nuevamente más tarde.
          </p>
        ) : items.length === 0 ? (
          <div ref={ref} className={`${styles.empty} fade-in`}>
            {events.empty}
          </div>
        ) : (
          <div ref={ref} className={`${styles.grid} fade-in`}>
            {items.map((item) => (
              <EventCard key={item.id} event={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}