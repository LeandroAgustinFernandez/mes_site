import { teachers, school } from '../../data/schoolData'
import { SectionTitle } from '../../components/SectionTitle/SectionTitle'
import { Button } from '../../components/Button/Button'
import { ImageCredit } from '../../components/ImageCredit/ImageCredit'
import { useReveal } from '../../hooks/useReveal'
import maestrosImg from '../../assets/maestros.webp'
import styles from './Teachers.module.css'

export function Teachers() {
  if (teachers.length === 0) return null

  return (
    <section id="maestros" className="section section--alt">
      <div className="container">
        <SectionTitle
          kicker="Maestros"
          title="Quienes guían el camino"
          subtitle="La dirección de la escuela está a cargo de dos referentes del Shaolin que forman a cada alumno desde el respeto y la constancia."
        />

        <div className={styles.grid}>
          <figure className={styles.media}>
            <img
              src={maestrosImg}
              alt={`${teachers.map((t) => t.name).join(' y ')}, maestros de la escuela ${school.name}`}
              className={styles.img}
              loading="lazy"
            />
            <figcaption className={styles.caption}>
              {teachers.map((t) => `${t.name} (${t.role})`).join(' · ')}
            </figcaption>
            <ImageCredit file="maestros.webp" />
          </figure>

          <div className={styles.profiles}>
            {teachers.map((teacher) => (
              <Profile key={teacher.name} {...teacher} />
            ))}

            <Button
              href={school.whatsappHref}
              variant="ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              Consultanos por clases
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function Profile({
  name,
  role,
  description,
}: (typeof teachers)[number]) {
  const ref = useReveal<HTMLElement>()

  return (
    <article ref={ref} className={`${styles.profile} fade-in`}>
      <header className={styles.profileHeader}>
        <span className={styles.avatar} aria-hidden="true">
          {name.charAt(0)}
        </span>
        <div>
          <h3 className={styles.profileName}>{name}</h3>
          <span className={styles.profileRole}>{role}</span>
        </div>
      </header>
      <p className={styles.profileText}>{description}</p>
    </article>
  )
}