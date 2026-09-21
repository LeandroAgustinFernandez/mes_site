import { school, heroPhrase, heroDescription } from '../../data/schoolData'
import { Button } from '../../components/Button/Button'
import { ImageCredit } from '../../components/ImageCredit/ImageCredit'
import heroImg from '../../assets/hero.webp'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <section id="inicio" className={styles.hero}>
      <img src={heroImg} alt="" className={styles.bg} />
      <ImageCredit file="hero.webp" />
      <div className={styles.overlay} />
      <div className={`container ${styles.content}`}>
        <span className={styles.eyebrow}>{school.tagline}</span>
        <h1 className={styles.title}>
          {school.name}
          <span className={styles.titleCn}>{school.nameCn}</span>
        </h1>
        <p className={styles.phrase}>{heroPhrase}</p>
        <p className={styles.description}>{heroDescription}</p>
        <div className={styles.actions}>
          <Button href="#escuela" variant="primary" size="lg">
            Conocé la escuela
          </Button>
          <Button href="#ubicaciones" variant="outline" size="lg">
            Dónde entrenamos
          </Button>
        </div>
      </div>
    </section>
  )
}