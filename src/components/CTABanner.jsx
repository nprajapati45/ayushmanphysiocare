import { motion } from 'framer-motion'
import { PHONE_TEL } from '../constants'

const ease = [0.22, 1, 0.36, 1]

export function CTABanner() {
  return (
    <motion.section
      className="section"
      style={{
        background: 'var(--color-primary)',
        color: '#fff',
        textAlign: 'center',
        padding: 'clamp(2.5rem, 5vw, 4rem) 0',
      }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px', amount: 0.35 }}
      transition={{ duration: 0.55, ease }}
    >
      <div className="container">
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
            color: '#fff',
            margin: '0 0 0.75rem',
          }}
        >
          Ready to Start Your Recovery?
        </h2>
        <p
          style={{
            margin: '0 auto 1.5rem',
            maxWidth: '36rem',
            opacity: 0.95,
            fontSize: '1.05rem',
          }}
        >
          Book an appointment today and take the first step toward a pain-free
          life.
        </p>
        <a className="btn btn--accent" href={PHONE_TEL}>
          📞 Call for Appointment
        </a>
      </div>
    </motion.section>
  )
}
