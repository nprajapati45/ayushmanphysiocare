import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import { Reveal } from '../components/Reveal'
import {
  ADDRESS_LINES,
  CLINIC_NAME,
  EMAIL,
  MAP_EMBED_SRC,
  PHONE_DISPLAY,
  PHONE_TEL,
  SERVICES_15,
  SOCIAL,
} from '../constants'
import './contact.css'

const ease = [0.22, 1, 0.36, 1]

/** Strip BOM, quotes, and edges — bad copy/paste in .env causes Web3Forms "Invalid Access Key". */
function sanitizeWeb3FormsKey(raw) {
  if (raw == null || typeof raw !== 'string') return ''
  return raw
    .replace(/^\uFEFF/, '')
    .replace(/^["']|["']$/g, '')
    .trim()
}

/** Static hosting (Hostinger, etc.): set VITE_WEB3FORMS_ACCESS_KEY — free, no server. Get key at https://web3forms.com */
const WEB3FORMS_KEY = sanitizeWeb3FormsKey(
  import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? ''
)
const WEB3FORMS_URL = 'https://api.web3forms.com/submit'

/** If no Web3Forms key: POST to this URL (local dev uses /api/contact via Vite proxy). */
const CONTACT_API_URL =
  (import.meta.env.VITE_CONTACT_API_URL || '').trim() || '/api/contact'

const initialForm = {
  name: '',
  phone: '',
  email: '',
  condition: '',
  message: '',
  preferredTime: 'Morning',
}

const initialErrors = {
  name: '',
  phone: '',
  email: '',
  message: '',
}

const NAME_MAX = 100
const MESSAGE_MIN = 10
const MESSAGE_MAX = 4000

/** Normalize Indian mobile: returns 10 digits or null */
function parseIndianMobile(input) {
  const digits = input.replace(/\D/g, '')
  if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2)
  if (digits.length === 11 && digits.startsWith('0')) return digits.slice(1)
  if (digits.length === 10) return digits
  return null
}

function validateContactForm(values) {
  const errors = { ...initialErrors }
  const name = values.name.trim()
  if (!name) errors.name = 'Please enter your full name.'
  else if (name.length < 2)
    errors.name = 'Name must be at least 2 characters.'
  else if (name.length > NAME_MAX)
    errors.name = `Name must be at most ${NAME_MAX} characters.`
  else if (/^\d+$/.test(name)) errors.name = 'Please enter a valid name.'

  const mobile = parseIndianMobile(values.phone)
  if (!values.phone.trim()) errors.phone = 'Please enter your phone number.'
  else if (!mobile || mobile.length !== 10)
    errors.phone = 'Enter a valid 10-digit Indian mobile number.'
  else if (!/^[6-9]\d{9}$/.test(mobile))
    errors.phone = 'Mobile number should start with 6–9 and be 10 digits.'

  const email = values.email.trim()
  if (email) {
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
    if (!emailOk) errors.email = 'Please enter a valid email address.'
  }

  const message = values.message.trim()
  if (!message) errors.message = 'Please enter a message.'
  else if (message.length < MESSAGE_MIN)
    errors.message = `Message must be at least ${MESSAGE_MIN} characters.`
  else if (message.length > MESSAGE_MAX)
    errors.message = `Message must be at most ${MESSAGE_MAX} characters.`

  const hasError = Object.values(errors).some(Boolean)
  return { errors, hasError }
}

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [fieldErrors, setFieldErrors] = useState(initialErrors)
  const [submitting, setSubmitting] = useState(false)
  const [toast, setToast] = useState(null)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setToast(null)

    const { errors, hasError } = validateContactForm(form)
    setFieldErrors(errors)
    if (hasError) {
      const firstKey = ['name', 'phone', 'email', 'message'].find((k) => errors[k])
      if (firstKey) {
        const el = document.getElementById(`contact-${firstKey}`)
        el?.focus?.()
        el?.scrollIntoView?.({ behavior: 'smooth', block: 'center' })
      }
      return
    }

    setSubmitting(true)
    try {
      const phoneDigits = parseIndianMobile(form.phone) ?? form.phone.trim()
      const nameTrim = form.name.trim()
      const emailTrim = form.email.trim()

      if (WEB3FORMS_KEY) {
        const conditionLabel = form.condition?.trim() || 'Not specified'
        const payload = {
          access_key: WEB3FORMS_KEY,
          subject: `New enquiry · Ayushman PhysioCare — ${nameTrim}`,
          name: nameTrim,
          email: emailTrim || EMAIL,
          phone: phoneDigits,
          replyto: emailTrim || EMAIL,
          'Service / condition': conditionLabel,
          'Preferred time': form.preferredTime,
          message: form.message.trim(),
          botcheck: '',
        }
        const res = await fetch(WEB3FORMS_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        })
        const data = await res.json().catch(() => ({}))
        if (!data.success) {
          throw new Error(
            typeof data.message === 'string'
              ? data.message
              : 'Could not send message. Please try again.'
          )
        }
      } else {
        const res = await fetch(CONTACT_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: nameTrim,
            phone: phoneDigits,
            email: emailTrim,
            condition: form.condition,
            message: form.message.trim(),
            preferredTime: form.preferredTime,
          }),
        })
        const data = await res.json().catch(() => ({}))
        if (!res.ok) {
          throw new Error(data.message || 'Request failed')
        }
      }

      setToast({ type: 'ok', text: "Thank you! We'll call you back shortly." })
      setForm(initialForm)
      setFieldErrors(initialErrors)
    } catch (err) {
      setToast({
        type: 'err',
        text:
          err.message ||
          'Could not send message. Please call us or try again later.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <section className="contact-hero">
        <motion.div
          className="container"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <h1>Contact Us</h1>
          <p>Reach out for appointments, questions, or directions to our clinic.</p>
        </motion.div>
      </section>

      <section className="section contact-section">
        <Reveal>
          <div className="container contact-grid">
          <div className="contact-info">
            <h2>{CLINIC_NAME}</h2>
            <ul className="contact-info__list">
              <li className="contact-info__address">
                <span aria-hidden>📍</span>
                <div className="contact-info__address-lines">
                  {ADDRESS_LINES.map((line) => (
                    <span key={line} className="contact-info__address-line">
                      {line}
                    </span>
                  ))}
                </div>
              </li>
              <li>
                <span aria-hidden>📞</span>
                <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>
              </li>
              <li>
                <span aria-hidden>📧</span>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
            </ul>

            <h3>Opening Hours</h3>
            <ul className="contact-info__hours">
              <li>Monday – Saturday: 9:00 AM – 6:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>

            <div className="contact-info__social" aria-label="Social media">
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

            <div className="contact-map">
              <iframe
                title="Map — Nanakheda Police Station, Ujjain, 456010"
                src={MAP_EMBED_SRC}
                width="100%"
                height="260"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>

          <div className="contact-form-wrap">
            <h2>Send a message</h2>
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <label>
                <span className="contact-form__label-text">
                  Full Name <span className="req">*</span>
                </span>
                <input
                  id="contact-name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                  maxLength={NAME_MAX}
                  aria-invalid={Boolean(fieldErrors.name)}
                  aria-describedby={
                    fieldErrors.name ? 'contact-name-error' : undefined
                  }
                  className={fieldErrors.name ? 'contact-form__input--error' : ''}
                />
                {fieldErrors.name ? (
                  <span id="contact-name-error" className="contact-form__error" role="alert">
                    {fieldErrors.name}
                  </span>
                ) : null}
              </label>
              <label>
                <span className="contact-form__label-text">
                  Phone Number <span className="req">*</span>
                </span>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  placeholder="e.g. 98765 43210"
                  value={form.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                  aria-invalid={Boolean(fieldErrors.phone)}
                  aria-describedby={
                    fieldErrors.phone ? 'contact-phone-error' : undefined
                  }
                  className={fieldErrors.phone ? 'contact-form__input--error' : ''}
                />
                {fieldErrors.phone ? (
                  <span id="contact-phone-error" className="contact-form__error" role="alert">
                    {fieldErrors.phone}
                  </span>
                ) : null}
              </label>
              <label>
                <span className="contact-form__label-text">
                  Email <span className="optional">(Optional)</span>
                </span>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={
                    fieldErrors.email ? 'contact-email-error' : undefined
                  }
                  className={fieldErrors.email ? 'contact-form__input--error' : ''}
                />
                {fieldErrors.email ? (
                  <span id="contact-email-error" className="contact-form__error" role="alert">
                    {fieldErrors.email}
                  </span>
                ) : null}
              </label>
              <label>
                <span className="contact-form__label-text">
                  Condition / Service
                </span>
                <select
                  name="condition"
                  value={form.condition}
                  onChange={handleChange}
                >
                  <option value="">Select a service</option>
                  {SERVICES_15.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span className="contact-form__label-text">
                  Message <span className="req">*</span>
                </span>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  maxLength={MESSAGE_MAX}
                  aria-invalid={Boolean(fieldErrors.message)}
                  aria-describedby={
                    fieldErrors.message ? 'contact-message-error' : undefined
                  }
                  className={fieldErrors.message ? 'contact-form__input--error' : ''}
                />
                {fieldErrors.message ? (
                  <span id="contact-message-error" className="contact-form__error" role="alert">
                    {fieldErrors.message}
                  </span>
                ) : null}
                <span className="contact-form__hint" aria-live="polite">
                  {form.message.trim().length} / {MESSAGE_MAX} characters (min {MESSAGE_MIN})
                </span>
              </label>
              <fieldset className="contact-form__time">
                <legend>Preferred time</legend>
                <label className="contact-form__inline">
                  <input
                    type="radio"
                    name="preferredTime"
                    value="Morning"
                    checked={form.preferredTime === 'Morning'}
                    onChange={handleChange}
                  />
                  Morning
                </label>
                <label className="contact-form__inline">
                  <input
                    type="radio"
                    name="preferredTime"
                    value="Evening"
                    checked={form.preferredTime === 'Evening'}
                    onChange={handleChange}
                  />
                  Evening
                </label>
              </fieldset>

              {toast && (
                <div
                  className={`contact-toast contact-toast--${toast.type}`}
                  role="status"
                >
                  {toast.text}
                </div>
              )}

              <button
                type="submit"
                className="btn btn--primary contact-form__submit"
                disabled={submitting}
              >
                {submitting ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
        </Reveal>
      </section>
    </>
  )
}
