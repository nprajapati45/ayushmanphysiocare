import { useEffect, useState } from 'react'

export function useInViewOnce(ref) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.35, rootMargin: '0px' }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [ref])

  return visible
}

export function useCountUp(target, durationMs, active) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return undefined

    let raf
    const start = performance.now()

    const tick = (now) => {
      const t = Math.min(1, (now - start) / durationMs)
      const eased = 1 - (1 - t) ** 2
      setValue(Math.round(target * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, durationMs, active])

  return value
}
