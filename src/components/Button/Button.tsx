import type { AnchorHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.css'

interface CommonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'md' | 'lg'
}

type ButtonProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  ...linkProps
}: ButtonProps) {
  return (
    <a
      className={`${styles.button} ${styles[variant]} ${styles[size]}`}
      {...linkProps}
    >
      {children}
    </a>
  )
}