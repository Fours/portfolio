import { highlights } from '../data/resume'

export default function Highlights() {
  return (
    <section aria-label="Highlights" className="container highlights-wrap">
      <div className="highlights">
        {highlights.map((h) => (
          <div key={h.value} className="highlight">
            <span className="highlight-value">{h.value}</span>
            <span className="highlight-label">{h.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
