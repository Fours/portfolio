import { email } from '../data/resume'
import { ArrowDownIcon, MailIcon } from './Icons'
import SocialLinks from './SocialLinks'

export default function Hero() {
  return (
    <section className="hero container">
      <div className="hero-copy">
        <p className="hero-kicker">// ai powered software engineer · nashville, tn</p>
        <h1 className="hero-title">Kyle Willett</h1>
        <p className="hero-lede">
          Full-stack, fast-learning software developer with 10+ years of experience designing and
          building software for business stakeholders — now building with AI every day and learning
          its patterns and best practices.
        </p>
        <div className="hero-actions">
          <a href={`mailto:${email}`} className="btn btn-primary">
            <MailIcon />
            Get in touch
          </a>
          <SocialLinks />
          <a href="#experience" className="btn btn-ghost">
            View experience
            <ArrowDownIcon />
          </a>
        </div>
      </div>

      <figure className="hero-figure">
        <div className="photo">
          <div className="photo-ring">
            <div className="photo-core">
              <img
                src="/me.jpg"
                alt="Kyle Willett smiling and pointing upward, in front of a system design diagram"
              />
            </div>
          </div>
        </div>
      </figure>
    </section>
  )
}
