import { useEffect, useState } from 'react'
import { navItems, school } from '../../data/schoolData'
import { Icon } from '../Icon'
import logo from '../../assets/logo.png'
import styles from './Header.module.css'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.inner}`}>
          <a href="#inicio" className={styles.brand}>
            <img
              src={logo}
              alt="Logo de la escuela Movimiento es Vida"
              className={styles.logo}
            />
            <span className={styles.brandText}>
              <span className={styles.brandName}>Movimiento es Vida</span>
              <span className={styles.brandSub}>Shaolin Kung Fu</span>
            </span>
          </a>

          <nav className={styles.desktopNav} aria-label="Navegación principal">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} className={styles.navLink}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className={styles.actions}>
            <a
              href={school.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.instagram}
              aria-label="Abrir Instagram de la escuela"
              title="Instagram"
            >
              <Icon name="instagram" size={22} />
            </a>
            <button
              type="button"
              className={styles.burger}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              onClick={() => setOpen((v) => !v)}
            >
              <Icon name={open ? 'close' : 'menu'} size={26} />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${open ? styles.mobileOpen : ''}`}
        aria-hidden={!open}
      >
        <nav className={styles.mobileNav} aria-label="Navegación móvil">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={styles.mobileLink}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.mobileFooter}>
          <a href="#contacto" className={styles.mobileCta} onClick={() => setOpen(false)}>
            <Icon name="phone" size={20} /> Contacto
          </a>
          <div className={styles.mobileContact}>
            <a href={school.phoneHref} className={styles.mobileLinkRow}>
              <Icon name="phone" size={18} /> {school.phone}
            </a>
            <a
              href={school.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobileLinkRow}
            >
              <Icon name="whatsapp" size={18} /> WhatsApp
            </a>
            <a
              href={school.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobileLinkRow}
            >
              <Icon name="instagram" size={18} /> {school.instagramHandle}
            </a>
          </div>
        </div>
      </div>
    </>
  )
}