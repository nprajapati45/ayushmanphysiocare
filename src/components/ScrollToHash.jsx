import { useEffect, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

function scrollWindowToTop() {
  const html = document.documentElement
  const prevBehavior = html.style.scrollBehavior
  html.style.scrollBehavior = 'auto'
  window.scrollTo(0, 0)
  html.scrollTop = 0
  document.body.scrollTop = 0
  html.style.scrollBehavior = prevBehavior
}

export function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useLayoutEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        requestAnimationFrame(() =>
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        )
      }
    } else {
      scrollWindowToTop()
    }
  }, [pathname, hash])

  return null
}
