import { BadgeIcon, CapIcon } from './Icons'
import SectionHeading from './SectionHeading'

export default function Education() {
  return (
    <section id="education" className="section container stack-40">
      <div className="section-intro">
        <SectionHeading index="06" label="education">
          Education &amp; certification
        </SectionHeading>
      </div>
      <div className="edu-grid">
        <div className="node edu-card">
          <span className="edu-icon"><CapIcon /></span>
          <div className="edu-text">
            <span className="edu-dates">1997 — 2001</span>
            <span className="edu-title">B.A., Multimedia Technologies</span>
            <span className="edu-where">Cedarville University · Cedarville, OH</span>
          </div>
        </div>
        <div className="node edu-card">
          <span className="edu-icon"><BadgeIcon /></span>
          <div className="edu-text">
            <span className="edu-dates">2017</span>
            <span className="edu-title">Scrum Master</span>
            <span className="edu-where">Certificate</span>
          </div>
        </div>
      </div>
    </section>
  )
}
