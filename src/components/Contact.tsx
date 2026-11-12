import { email } from '../data/resume'
import { MailIcon } from './Icons'
import SocialLinks from './SocialLinks'
import ResumeLink from './ResumeLink'

export default function Contact() {
  return (
    <section id="contact" className="section container contact-wrap">
      <div className="contact">
        <div className="contact-copy">
          <span className="eyebrow">06 / contact</span>
          <h2 className="contact-title">Let's build something.</h2>
        </div>
        <div className="contact-actions">
          <a href={`mailto:${email}`} className="btn btn-primary btn-lg">
            <MailIcon size={20} />
            Email
          </a>
          <ResumeLink placement="contact" className="btn btn-ghost btn-lg" iconSize={20} />
          <SocialLinks />
        </div>
      </div>
    </section>
  )
}
