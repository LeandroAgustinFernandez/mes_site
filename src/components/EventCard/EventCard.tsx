import type { EventItem } from '../../types/event'
import { formatEventDate } from '../../utils/format'
import { useReveal } from '../../hooks/useReveal'
import { Icon } from '../Icon'
import styles from './EventCard.module.css'

export function EventCard({ event }: { event: EventItem }) {
  const ref = useReveal<HTMLElement>()

  return (
    <article ref={ref} className={`${styles.card} fade-in`}>
      {event.image_url ? (
        <div className={styles.imgWrap}>
          <img
            src={event.image_url}
            alt={event.title}
            className={styles.img}
            loading="lazy"
          />
        </div>
      ) : (
        <div className={`${styles.imgWrap} ${styles.noImage}`} aria-hidden="true">
          <Icon name="calendar" size={40} />
        </div>
      )}
      <div className={styles.body}>
        <h3 className={styles.title}>{event.title}</h3>
        <p className={styles.desc}>{event.description}</p>
        <p className={styles.date}>
          <Icon name="calendar" size={16} />
          Publicado: {formatEventDate(event.created_at)}
        </p>
      </div>
    </article>
  )
}