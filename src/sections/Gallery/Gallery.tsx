import { useCallback, useEffect, useState } from 'react'
import { galleryItems } from '../../data/galleryImages'
import { gallery, school } from '../../data/schoolData'
import { SectionTitle } from '../../components/SectionTitle/SectionTitle'
import { Button } from '../../components/Button/Button'
import { Icon } from '../../components/Icon'
import { useReveal } from '../../hooks/useReveal'
import styles from './Gallery.module.css'

export function GallerySection() {
  const [active, setActive] = useState<number | null>(null)
  const ref = useReveal<HTMLDivElement>()

  const close = useCallback(() => setActive(null), [])
  const prev = useCallback(
    () => setActive((i) => (i === null ? null : (i - 1 + galleryItems.length) % galleryItems.length)),
    [],
  )
  const next = useCallback(
    () => setActive((i) => (i === null ? null : (i + 1) % galleryItems.length)),
    [],
  )

  useEffect(() => {
    if (active === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [active, close, prev, next])

  return (
    <section id="galeria" className="section">
      <div className="container">
        <SectionTitle
          kicker="Galería"
          title={gallery.title}
          subtitle={gallery.subtitle}
        />

        <div ref={ref} className={`${styles.grid}`}>
          {galleryItems.map((item, index) => (
            <button
              key={item.src}
              type="button"
              className={`${styles.tile} ${styles[`span${(index % 5) + 1}`]}`}
              onClick={() => setActive(index)}
              aria-label={`Ampliar imagen: ${item.alt}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className={styles.img}
              />
              {item.credit && (
                <span className={styles.credit}>{item.credit}</span>
              )}
            </button>
          ))}
        </div>

        <div className={styles.cta}>
          <p>{gallery.instagramCta}</p>
          <Button
            href={school.instagram}
            variant="primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="instagramFilled" size={18} /> {school.instagramHandle}
          </Button>
        </div>
      </div>

      {active !== null && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={galleryItems[active].alt}
          onClick={close}
        >
          <div
            className={styles.lightboxPanel}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryItems[active].src}
              alt={galleryItems[active].alt}
              className={styles.lightboxImg}
            />
            <button
              type="button"
              className={`${styles.lightboxBtn} ${styles.prev}`}
              onClick={prev}
              aria-label="Imagen anterior"
            >
              <Icon name="chevronLeft" size={26} />
            </button>
            <button
              type="button"
              className={`${styles.lightboxBtn} ${styles.next}`}
              onClick={next}
              aria-label="Imagen siguiente"
            >
              <Icon name="chevronRight" size={26} />
            </button>
            <button
              type="button"
              className={`${styles.lightboxBtn} ${styles.closeBtn}`}
              onClick={close}
              aria-label="Cerrar galería"
            >
              <Icon name="close" size={26} />
            </button>
            <p className={styles.counter}>
              {active + 1} / {galleryItems.length}
            </p>
            {galleryItems[active].credit && (
              <p className={styles.lightboxCredit}>
                Foto · {galleryItems[active].credit}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  )
}