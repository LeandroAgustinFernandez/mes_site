import { school, locations } from '../../data/schoolData'
import { SectionTitle } from '../../components/SectionTitle/SectionTitle'
import { Icon } from '../../components/Icon'
import styles from './Contact.module.css'

export function Contact() {
  return (
    <section id="contacto" className="section">
      <div className="container">
        <SectionTitle
          kicker="Contacto"
          title="Sumate a la escuela"
          subtitle="Escribinos, llamanos o seguinos en Instagram. Respondemos consultas sobre clases, horarios y nueva sede."
        />

        <div className={styles.wrap}>
          <div className={styles.direct}>
            <h3 className={styles.panelTitle}>Contacto directo</h3>

            <a href={school.phoneHref} className={styles.tile}>
              <span className={styles.tileIcon}>
                <Icon name="phone" size={22} />
              </span>
              <span className={styles.tileText}>
                <span className={styles.tileLabel}>Teléfono</span>
                <span className={styles.tileValue}>{school.phone}</span>
              </span>
            </a>

            <a
              href={school.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.tile}
            >
              <span className={styles.tileIcon}>
                <Icon name="whatsapp" size={22} />
              </span>
              <span className={styles.tileText}>
                <span className={styles.tileLabel}>WhatsApp</span>
                <span className={styles.tileValue}>{school.phone}</span>
              </span>
            </a>

            <a
              href={school.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.tile}
            >
              <span className={styles.tileIcon}>
                <Icon name="instagramFilled" size={22} />
              </span>
              <span className={styles.tileText}>
                <span className={styles.tileLabel}>Instagram</span>
                <span className={styles.tileValue}>{school.instagramHandle}</span>
              </span>
            </a>
          </div>

          <div className={styles.locations}>
            <h3 className={styles.panelTitle}>Dónde estamos</h3>
            <ul>
              {locations.map((location) => (
                <li key={location.id}>
                  <span className={styles.locName}>{location.club}</span>
                  <span className={styles.locAddr}>
                    {location.address}
                    <br />
                    {location.locality}
                  </span>
                  <a
                    href={location.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.mapLink}
                  >
                    <Icon name="pin" size={14} /> Ver en Google Maps
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}