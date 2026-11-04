import { useEffect, useRef, useState } from 'react'
import { highlights, type Highlight as HighlightData } from '../data/resume'

const DURATION = 3000

// Counts from `from` to `to` over `duration` ms, starting on mount.
// Eased so it decelerates toward the final value. Works in either direction.
function useCountUp(from: number, to: number, duration = DURATION) {
  const [value, setValue] = useState(from)
  const rafRef = useRef<number>()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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
  }, [from, to, duration])

  return value
}

function Highlight({ from, to, format, label }: HighlightData) {
  const value = useCountUp(from, to)
  return (
    <div className="highlight">
      <span className="highlight-value">{format(value)}</span>
      <span className="highlight-label">{label}</span>
    </div>
  )
}

export default function Highlights() {
  return (
    <section aria-label="Highlights" className="container highlights-wrap">
      <div className="highlights">
        {highlights.map((h) => (
          <Highlight key={h.label} {...h} />
        ))}
      </div>
    </section>
  )
}
