import type { ReactNode } from 'react'

type Props = { index: string; label: string; children: ReactNode }

export default function SectionHeading({ index, label, children }: Props) {
  return (
    <>
      <span className="eyebrow">
        {index} / {label}
      </span>
      <h2 className="section-title">{children}</h2>
    </>
  )
}
