import { socials, type Social } from '../data/resume'
import { GitHubIcon, XIcon, YouTubeIcon } from './Icons'

const icons: Record<Social['kind'], typeof XIcon> = {
  x: XIcon,
  github: GitHubIcon,
  youtube: YouTubeIcon,
}

export default function SocialLinks() {
  return (
    <ul className="socials">
      {socials.map(({ kind, label, href }) => {
        const Icon = icons[kind]
        return (
          <li key={kind}>
            <a
              href={href}
              className={`social is-${kind}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
            >
              <Icon size={kind === 'x' ? 18 : 20} />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
