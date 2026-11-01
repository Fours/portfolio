import { skillGroups } from '../data/resume'
import SectionHeading from './SectionHeading'
import { TechIcon } from './Icons'

export default function Skills() {
  return (
    <section id="skills" className="section band">
      <div className="container stack-48">
        <div className="section-intro">
          <SectionHeading index="04" label="skills">
            Competencies
          </SectionHeading>
        </div>
        <div className="skill-grid">
          {skillGroups.map((group) => (
            <div key={group.name} className={group.featured ? 'skill-card skill-card-featured' : 'skill-card'}>
              <h3 className="skill-card-title">{group.name}</h3>
              <div className="chips">
                {group.skills.map((s) => (
                  <span key={s.label} className="chip">
                    {s.icon && <TechIcon name={s.icon} />}
                    {s.label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
