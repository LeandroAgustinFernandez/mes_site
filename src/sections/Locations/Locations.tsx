import { locations, school } from '../../data/schoolData'
import { SectionTitle } from '../../components/SectionTitle/SectionTitle'
import { Button } from '../../components/Button/Button'
import { Icon } from '../../components/Icon'
import { useReveal } from '../../hooks/useReveal'
import styles from './Locations.module.css'

export function Locations() {
  return (
    <section id="ubicaciones" className="section">
      <div className="container">
        <SectionTitle
          kicker="Dónde entrenamos"
          title="Nuestras sedes"
          subtitle="Entrenamos en clubes y espacios de Lomas de Zamora, Temperley y Remedios de Escalada. Consultá días y horarios de cada sede."
        />

        <div className={styles.grid}>
          {locations.map((location) => (
            <LocationCard key={location.id} {...location} />
          ))}
        </div>
      </div>
    </section>
  )
}

function LocationCard({
  name,
  club,
  address,
  locality,
  schedule,
  mapUrl,
}: (typeof locations)[number]) {
  const ref = useReveal<HTMLElement>()

  return (
    <article ref={ref} className={`${styles.card} fade-in`}>
      <header className={styles.cardHeader}>
        <span className={styles.badge}>Sede</span>
        <h3 className={styles.cardName}>{name}</h3>
        <span className={styles.club}>{club}</span>
      </header>

      <div className={styles.info}>
        <p className={styles.infoLine}>
          <Icon name="pin" size={18} className={styles.infoIcon} />
          <span>
            {address}
            <br />
            {locality}
          </span>
        </p>
      </div>

      <div className={styles.schedule}>
        <h4 className={styles.scheduleTitle}>
          <Icon name="clock" size={17} className={styles.scheduleIcon} />
          Horarios
        </h4>
        <ul>
          {schedule.map((slot) => (
            <li key={slot.day} className={styles.slot}>
              <span className={styles.slotDay}>{slot.day}</span>
              <div className={styles.formats}>
                {slot.format.map((format) => (
                  <div key={format.type} className={styles.format}>
                    <span className={styles.formatType}>{format.type}</span>
                    <span className={styles.slotHours}>{format.hours}</span>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.cardFooter}>
        <Button
          href={mapUrl}
          variant="outline"
          size="md"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="pin" size={16} /> Ver ubicación
        </Button>
        <a
          href={school.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.whatsapp}
          aria-label="Consultar por WhatsApp"
        >
          <Icon name="whatsapp" size={18} />
        </a>
      </div>
    </article>
  )
}