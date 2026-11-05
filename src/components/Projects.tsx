import { projects, type Project } from '../data/resume'
import SectionHeading from './SectionHeading'
import { ArrowUpRightIcon, SparkIcon } from './Icons'

function Shot({ project }: { project: Project }) {
  if (project.image) {
    return <img className="project-shot" src={project.image} alt={`${project.title} screenshot`} loading="lazy" />
  }
  return (
    <div className="project-shot project-shot-empty" aria-hidden="true">
      <div className="project-shot-chrome">
        <span />
        <span />
        <span />
      </div>
      <span className="project-shot-label">screenshot coming soon</span>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section container stack-56">
      <div className="section-intro">
        <SectionHeading index="03" label="projects">
          Latest Projects
        </SectionHeading>
        <p className="section-lede">
          Things I build for fun, and to push how far AI-assisted development can go. I plan the
          work, steer the agents and review every change, turning ideas into working software in a
          fraction of the time.
        </p>
      </div>

      <div className="project-grid">
        {projects.map((p) => (
          <article key={p.title} className="project-card">
            <a className="project-media" href={p.cta.href} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true">
              <Shot project={p} />
              {p.status && <span className="project-status">{p.status}</span>}
            </a>
            <div className="project-body">
              <div className="project-head">
                <h3 className="project-title">{p.title}</h3>
                <p className="project-tagline">{p.tagline}</p>
              </div>
              <p className="project-desc">{p.description}</p>
              <p className="project-ai">
                <SparkIcon size={16} />
                <span>{p.aiNote}</span>
              </p>
              <div className="tags">
                {p.tech.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
              <a className="btn btn-ghost project-cta" href={p.cta.href} target="_blank" rel="noopener noreferrer">
                {p.cta.label}
                <ArrowUpRightIcon size={16} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
