import { email } from '../data/resume'
import { MailIcon } from './Icons'

export default function Contact() {
  return (
    <section id="contact" className="section container contact-wrap">
      <div className="contact">
        <div className="contact-copy">
          <span className="eyebrow">06 / contact</span>
          <h2 className="contact-title">Let's build something.</h2>
          <p className="section-lede">The fastest way to reach me is email.</p>
        </div>
        <a href={`mailto:${email}`} className="btn btn-primary btn-lg">
          <MailIcon size={20} />
          {email}
        </a>
      </div>
    </section>
  )
}
