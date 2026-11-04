import { useEffect, useRef, useState } from 'react'
import { highlights, type Highlight as HighlightData } from '../data/resume'

const DURATION = 3000

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Counts from `from` to `to` over `duration` ms whenever `active` becomes true.
// Resets to `from` when inactive so the count replays on the next activation.
// Eased so it decelerates toward the final value. Works in either direction.
function useCountUp(from: number, to: number, active: boolean, duration = DURATION) {
  const [value, setValue] = useState(from)
  const rafRef = useRef<number>()

  useEffect(() => {
    if (!active) {
      setValue(from)
      return
    }

    if (prefersReducedMotion()) {
      setValue(to)
      return
    }

    let start: number | null = null
    const step = (timestamp: number) => {
      if (start === null) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(from + (to - from) * eased))
      if (progress < 1) rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [from, to, duration, active])

  return value
}

function Highlight({ from, to, format, label, active }: HighlightData & { active: boolean }) {
  const value = useCountUp(from, to, active)
  return (
    <div className={active ? 'highlight is-in' : 'highlight'}>
      <span className="highlight-value">{format(value)}</span>
      <span className="highlight-label">{label}</span>
    </div>
  )
}

// Tracks whether the element is in the viewport, flipping back to false on exit
// so the next scroll-in re-triggers the animations.
function useInView<T extends Element>() {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.4 },
    )
    observer.observe(el)

    return () => observer.disconnect()
  }, [])

  return [ref, inView] as const
}

export default function Highlights() {
  const [ref, inView] = useInView<HTMLDivElement>()

  return (
    <section aria-label="Highlights" className="container highlights-wrap">
      <div ref={ref} className="highlights">
        {highlights.map((h) => (
          <Highlight key={h.label} {...h} active={inView} />
        ))}
      </div>
    </section>
  )
}
