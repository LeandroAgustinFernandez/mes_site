import { disciplines } from '../../data/schoolData'
import { imageCredits } from '../../data/imageCredits'
import { SectionTitle } from '../../components/SectionTitle/SectionTitle'
import { ImageCredit } from '../../components/ImageCredit/ImageCredit'
import { useReveal } from '../../hooks/useReveal'
import trainingImg from '../../assets/training.webp'
import heroImg from '../../assets/hero.webp'
import styles from './Training.module.css'

const creditByImage: Record<string, keyof typeof imageCredits> = {
  [trainingImg]: 'training.webp',
  [heroImg]: 'hero.webp',
}

export function Training() {
  return (
    <section id="entrenamiento" className="section">
      <div className="container">
        <SectionTitle
          kicker="Entrenamiento"
          title="Disciplinas que se entrenan en la escuela"
          subtitle="Cada clase combina el trabajo técnico tradicional con el acondicionamiento físico, en un ambiente respetuoso y de crecimiento."
        />

        <div className={styles.grid}>
          {disciplines.map((discipline) => (
            <TrainingCard key={discipline.name} {...discipline} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TrainingCard({
  name,
  tagline,
  description,
  image,
  audience,
}: (typeof disciplines)[number]) {
  const ref = useReveal<HTMLElement>()

  return (
    <article ref={ref} className={`${styles.card} fade-in`}>
      <div className={styles.imgWrap}>
        <img src={image} alt={`Clase de ${name} en Movimiento es Vida`} className={styles.img} loading="lazy" />
        {creditByImage[image] && <ImageCredit file={creditByImage[image]} />}
      </div>
      <div className={styles.body}>
        <span className={styles.tagline}>{tagline}</span>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.desc}>{description}</p>
        <p className={styles.audience}>
          <strong>¿Para quién?</strong> {audience}
        </p>
      </div>
    </article>
  )
}