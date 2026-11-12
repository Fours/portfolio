import { useRef } from 'react'
import { email } from '../data/resume'
import { ArrowDownIcon, MailIcon } from './Icons'
import SocialLinks from './SocialLinks'
import NeuralNet from './NeuralNet'
import ResumeLink from './ResumeLink'

export default function Hero() {
  const copyRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLElement>(null)

  return (
    <div className="hero-shell">
      <NeuralNet copyRef={copyRef} photoRef={photoRef} />
      <section className="hero container">
        <div className="hero-copy" ref={copyRef}>
          <p className="hero-kicker">// ai powered software engineer · nashville, tn</p>
          <h1 className="hero-title">Kyle Willett</h1>
          <p className="hero-lede">
            Full-stack, fast-learning software developer with 10+ years of experience designing and
            building software for business stakeholders — now building with AI every day and
            learning its patterns and best practices.
          </p>
          <div className="hero-actions">
            <a href={`mailto:${email}`} className="btn btn-primary">
              <MailIcon />
              Get in touch
            </a>
            <ResumeLink placement="hero" className="btn btn-ghost" />
            <SocialLinks />
            <a href="#experience" className="btn btn-ghost hero-view-exp">
              View experience
              <ArrowDownIcon />
            </a>
          </div>
        </div>

        <figure className="hero-figure" ref={photoRef}>
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
    </div>
  )
}
