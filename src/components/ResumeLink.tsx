import { resumeHref } from '../data/resume'
import { track } from '../analytics'
import { FileIcon } from './Icons'

type Props = {
  // Where on the page the link sits; sent with the analytics event.
  placement: 'hero' | 'contact'
  className: string
  iconSize?: number
}

// Opens the PDF resume in a new tab (the browser's viewer has its own download button).
export default function ResumeLink({ placement, className, iconSize }: Props) {
  return (
    <a
      href={resumeHref}
      className={className}
      target="_blank"
      rel="noopener"
      onClick={() => track('resume_opened', { placement })}
    >
      <FileIcon size={iconSize} />
      Resume
    </a>
  )
}
