// Inline stroke icons, sized by props and colored by currentColor.

type IconProps = { size?: number }

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

export function MailIcon({ size = 18 }: IconProps) {
  return (
    <svg {...base} width={size} height={size} viewBox="0 0 24 24" strokeWidth={2}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  )
}

export function ArrowDownIcon({ size = 16 }: IconProps) {
  return (
    <svg {...base} width={size} height={size} viewBox="0 0 24 24" strokeWidth={2}>
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  )
}

export function PulseIcon({ size = 22 }: IconProps) {
  return (
    <svg {...base} width={size} height={size} viewBox="0 0 24 24" strokeWidth={2}>
      <path d="M3 12h4l3-8 4 16 3-8h4" />
    </svg>
  )
}

export function CapIcon({ size = 22 }: IconProps) {
  return (
    <svg {...base} width={size} height={size} viewBox="0 0 24 24" strokeWidth={1.8}>
      <path d="M22 10 12 5 2 10l10 5 10-5Z" />
      <path d="M6 12v5c3 2 9 2 12 0v-5" />
    </svg>
  )
}

export function BadgeIcon({ size = 22 }: IconProps) {
  return (
    <svg {...base} width={size} height={size} viewBox="0 0 24 24" strokeWidth={1.8}>
      <circle cx="12" cy="9" r="6" />
      <path d="m8.5 14-1.5 8 5-3 5 3-1.5-8" />
    </svg>
  )
}

export function FlowArrow() {
  return (
    <svg className="hide-sm" aria-hidden="true" width="40" height="12" viewBox="0 0 40 12" fill="none" stroke="#3a4a6b" strokeWidth={1.5}>
      <path d="M0 6h36" />
      <path d="m31 1 5 5-5 5" />
    </svg>
  )
}
