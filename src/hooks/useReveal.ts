import { useCallback, useEffect, useState } from 'react'

export function useReveal<T extends HTMLElement>() {
  const [node, setNode] = useState<T | null>(null)

  const ref = useCallback((el: T | null) => {
    setNode(el)
  }, [])

  useEffect(() => {
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [node])

  return ref
}