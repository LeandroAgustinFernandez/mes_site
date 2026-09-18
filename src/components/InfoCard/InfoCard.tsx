import type { ReactNode } from 'react'
import { useReveal } from '../../hooks/useReveal'
import styles from './InfoCard.module.css'

interface InfoCardProps {
  icon?: ReactNode
  title: string
  text: string
}

export function InfoCard({ icon, title, text }: InfoCardProps) {
  const ref = useReveal<HTMLElement>()

  return (
    <article ref={ref} className={`${styles.card} fade-in`}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{text}</p>
    </article>
  )
}