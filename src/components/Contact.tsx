import { email } from '../data/resume'
import { MailIcon } from './Icons'
import SocialLinks from './SocialLinks'

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
          <SocialLinks />
        </div>
      </div>
    </section>
  )
}
