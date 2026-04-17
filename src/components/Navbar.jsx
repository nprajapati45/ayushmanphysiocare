import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LogoIcon } from './LogoIcon'
import { PHONE_DISPLAY, PHONE_TEL } from '../constants'
import './Navbar.css'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const closeDrawer = () => setOpen(false)

  return (
    <header
      className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
      role="banner"
    >
      <div className="container nav__inner">
        <Link to="/" className="nav__brand">
          <LogoIcon />
          <span>Ayushman PhysioCare</span>
        </Link>

        <nav className="nav__desktop" aria-label="Primary">
          <ul className="nav__links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/#facilities">Facilities</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        <a className="btn btn--accent nav__cta" href={PHONE_TEL}>
          📞 Call for Appointment
        </a>

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="nav-drawer"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          {open ? '✕' : '☰'}
        </button>
      </div>

      <button
        type="button"
        className={`nav__backdrop ${open ? 'nav__backdrop--open' : ''}`}
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
        onClick={closeDrawer}
      />

      <aside
        id="nav-drawer"
        className={`nav__drawer ${open ? 'nav__drawer--open' : ''}`}
        aria-hidden={!open}
      >
        <div className="nav__drawer-inner">
          <Link to="/" onClick={closeDrawer}>
            Home
          </Link>
          <Link to="/about" onClick={closeDrawer}>
            About
          </Link>
          <Link to="/services" onClick={closeDrawer}>
            Services
          </Link>
          <Link to="/#facilities" onClick={closeDrawer}>
            Facilities
          </Link>
          <Link to="/contact" onClick={closeDrawer}>
            Contact
          </Link>
          <a className="btn btn--accent nav__cta-mobile" href={PHONE_TEL}>
            📞 Call {PHONE_DISPLAY}
          </a>
        </div>
      </aside>
    </header>
  )
}
