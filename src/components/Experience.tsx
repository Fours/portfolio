import { jobs } from '../data/resume'
import SectionHeading from './SectionHeading'

export default function Experience() {
  return (
    <section id="experience" className="section container stack-56">
      <div className="section-intro">
        <SectionHeading index="04" label="experience">
          Where I've worked
        </SectionHeading>
      </div>

      <div className="timeline">
        {jobs.map((job, i) => (
          <article key={job.org} className="job">
            <span aria-hidden="true" className={i === 0 ? 'job-dot job-dot-current' : 'job-dot'} />
            <div className="job-dates">{job.dates}</div>
            <div className="job-body">
              <div>
                <h3 className="job-title">{job.title}</h3>
                <p className="job-org">{job.org}</p>
              </div>
              {job.bullets && (
                <ul className="job-bullets">
                  {job.bullets.map((b) => (
                    <li key={b}>
                      <span aria-hidden="true" className="job-arrow">→</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
              {job.summary && <p className="job-summary">{job.summary}</p>}
              {job.tags && (
                <div className="tags">
                  {job.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
