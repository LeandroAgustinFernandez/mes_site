import { useReveal } from '../../hooks/useReveal'
import styles from './SectionTitle.module.css'

interface SectionTitleProps {
  kicker?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  light?: boolean
}

export function SectionTitle({
  kicker,
  title,
  subtitle,
  align = 'left',
  light = false,
}: SectionTitleProps) {
  const ref = useReveal<HTMLDivElement>()
  const alignClass = align === 'center' ? styles.center : styles.left

  return (
    <div
      ref={ref}
      className={`${styles.wrap} ${alignClass} fade-in ${light ? styles.light : ''}`}
    >
      {kicker && <span className={styles.kicker}>{kicker}</span>}
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  )
}