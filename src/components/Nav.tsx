import { useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import { navLinks } from '../data/resume'

export default function Nav() {
  const [open, setOpen] = useState(false)

  // Collapse the menu before the browser jumps to the anchor, so the jump
  // is measured against the short header rather than the open menu.
  const closeMenu = () => flushSync(() => setOpen(false))

  // Close the phone menu on Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={open ? 'nav-bar nav-open' : 'nav-bar'}>
      <nav className="nav container" aria-label="Primary">
        <a href="#top" className="logo" aria-label="Kyle Willett, back to top" onClick={closeMenu}>
          <span className="logo-ring">
            <span className="logo-core">
              <span className="logo-text">KW</span>
            </span>
          </span>
        </a>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="nav-links"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="nav-toggle-bars" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
        <div id="nav-links" className="nav-links">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={link.href === '#contact' ? 'nav-cta' : undefined}
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}
