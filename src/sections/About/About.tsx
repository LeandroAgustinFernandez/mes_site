import { aboutText, values, school } from '../../data/schoolData'
import { SectionTitle } from '../../components/SectionTitle/SectionTitle'
import { InfoCard } from '../../components/InfoCard/InfoCard'
import { ImageCredit } from '../../components/ImageCredit/ImageCredit'
import { Icon } from '../../components/Icon'
import { useReveal } from '../../hooks/useReveal'
import aboutImg from '../../assets/about.webp'
import styles from './About.module.css'

export function About() {
  const imgRef = useReveal<HTMLImageElement>()

  return (
    <section id="escuela" className="section">
      <div className="container">
        <SectionTitle
          kicker="La Escuela"
          title="Shaolin Kung Fu al alcance de la comunidad"
        />

        <div className={styles.grid}>
          <div className={styles.textCol}>
            {aboutText.map((block) => (
              <div key={block.title} className={styles.block}>
                <h3 className={styles.blockTitle}>{block.title}</h3>
                <p className={styles.blockText}>{block.body}</p>
              </div>
            ))}

            <div className={styles.values}>
              {values.map((value) => (
                <span key={value} className={styles.value}>
                  {value}
                </span>
              ))}
            </div>
          </div>

          <figure className={styles.media}>
            <img
              ref={imgRef}
              src={aboutImg}
              alt="Entrenamiento de Shaolin Kung Fu de la escuela Movimiento es Vida"
              className={`${styles.img} fade-in`}
              loading="lazy"
            />
            <figcaption className={styles.caption}>
              {school.name} · {school.tagline}
            </figcaption>
            <ImageCredit file="about.webp" />
          </figure>
        </div>

        <div className={styles.cards}>
          <InfoCard
            icon={<Icon name="clock" size={26} />}
            title="Clases gratuitas"
            text="El proyecto incluye clases gratuitas de Shaolin Kung Fu para la comunidad en espacios públicos, abiertas a todas las edades y sin barreras de condición física."
          />
          <InfoCard
            icon={<Icon name="pin" size={26} />}
            title="Tres sedes"
            text="Entrenamos en el Club Gimnasia y Esgrima de Lomas de Zamora, el Club Ituzaingó de Temperley y el Club La Amistad de Remedios de Escalada."
          />
          <InfoCard
            icon={<Icon name="phone" size={26} />}
            title="Contacto directo"
            text="Escribinos por WhatsApp o llamanos para consultar días, horarios y cómo sumarte a la escuela. Te esperamos a entrenar."
          />
        </div>
      </div>
    </section>
  )
}