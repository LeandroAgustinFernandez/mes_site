import { navItems, school } from '../../data/schoolData'
import { Icon } from '../Icon'
import logo from '../../assets/logo.png'
import styles from './Footer.module.css'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brandCol}>
          <div className={styles.brand}>
            <img src={logo} alt="" className={styles.logo} />
            <div>
              <div className={styles.name}>{school.name}</div>
              <div className={styles.sub}>{school.nameCn} · Shaolin Kung Fu</div>
            </div>
          </div>
          <p className={styles.desc}>
            Escuela de Shaolin Kung Fu que acerca las artes marciales a la
            comunidad en Lomas de Zamora, Temperley y Remedios de Escalada.
          </p>
          <a
            href={school.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.insta}
          >
            <Icon name="instagram" size={20} /> {school.instagramHandle}
          </a>
        </div>

        <nav className={styles.navCol} aria-label="Navegación del pie de página">
          <h3 className={styles.colTitle}>Navegación</h3>
          <ul>
            {navItems
              .filter((item) => item.id !== 'contacto')
              .map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className={styles.navLink}>
                    {item.label}
                  </a>
                </li>
              ))}
          </ul>
        </nav>

        <div className={styles.contactCol}>
          <h3 className={styles.colTitle}>Contacto</h3>
          <a href={school.phoneHref} className={styles.contactLink}>
            <Icon name="phone" size={18} /> {school.phone}
          </a>
          <a href={school.whatsappHref} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
            <Icon name="whatsapp" size={18} /> WhatsApp
          </a>
          <div className={styles.contactLink}>
            <Icon name="pin" size={18} />
            <span>
              Lomas de Zamora · Temperley
              <br />
              Remedios de Escalada · Buenos Aires
            </span>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={`container ${styles.bottomInner}`}>
          <span>© {year} {school.name}. Todos los derechos reservados.</span>
          <span className={styles.trad}>运动就是生命</span>
        </div>
      </div>
    </footer>
  )
}