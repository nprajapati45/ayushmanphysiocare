import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import { LogoIcon } from './LogoIcon'
import {
  ADDRESS_LINES,
  EMAIL,
  PHONE_DISPLAY,
  PHONE_TEL,
  SOCIAL,
} from '../constants'
import './Footer.css'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LogoIcon className="footer__logo" />
            <p className="footer__brand" style={{ margin: 0 }}>
              Ayushman PhysioCare
            </p>
          </div>
          <p className="footer__tagline">
            Advanced, evidence-based care for a pain-free, active life in Ujjain.
          </p>
        </div>
        <div>
          <h3 className="footer__heading">Quick Links</h3>
          <ul className="footer__list">
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
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="footer__col-contact">
          <h3 className="footer__heading">Contact</h3>
          <ul className="footer__list">
            <li className="footer__address">
              <span className="footer__address-pin" aria-hidden>
                📍
              </span>
              <div className="footer__address-lines">
                {ADDRESS_LINES.map((line) => (
                  <span key={line} className="footer__address-line">
                    {line}
                  </span>
                ))}
              </div>
            </li>
            <li>
              📞{' '}
              <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>
            </li>
            <li>
              📧{' '}
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="footer__heading">Opening Hours</h3>
          <ul className="footer__list">
            <li>Mon – Sat: 9:00 AM – 6:00 PM</li>
            <li>Sunday: Closed</li>
          </ul>
          <div className="footer__social" aria-label="Social links">
            <a
              className="social-link social-link--facebook"
              href={SOCIAL.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              className="social-link social-link--instagram"
              href={SOCIAL.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              className="social-link social-link--twitter"
              href={SOCIAL.twitter}
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              className="social-link social-link--whatsapp"
              href={SOCIAL.whatsapp}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>
      <div className="container footer__bottom">
        © 2025 Ayushman PhysioCare. All rights reserved.
      </div>
    </footer>
  )
}
