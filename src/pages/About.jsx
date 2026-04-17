import { motion } from 'framer-motion'
import { CTABanner } from '../components/CTABanner'
import { Reveal } from '../components/Reveal'
import { DOCTOR_IMG, HERO_BG } from '../constants'
import './about.css'

const ease = [0.22, 1, 0.36, 1]

export default function About() {
  return (
    <>
      <section
        className="page-hero"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      >
        <div className="page-hero__overlay" />
        <motion.div
          className="page-hero__inner container"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease }}
        >
          <h1 className="page-hero__title">About Dr. Nitesh Prajapati</h1>
        </motion.div>
      </section>

      <section className="section">
        <Reveal>
          <div className="container about-page-grid">
          <div className="about-page__photo">
            <img src={DOCTOR_IMG} alt="Dr. Nitesh Prajapati" loading="lazy" />
            <div className="about-page__badge">MPT Orthopaedics</div>
          </div>
          <div className="about-page__bio">
            <h2>Meet your physiotherapist</h2>
            <p>
              Dr. Nitesh Prajapati is a dedicated orthopaedic physiotherapist
              with a Master&apos;s degree (MPT) in Orthopaedics. His practice
              focuses on evidence-based assessment, hands-on treatment, and
              exercise prescription to help patients recover from pain, injury,
              and mobility limitations.
            </p>
            <p>
              He has extensive experience managing spinal conditions, joint
              pain, sports injuries, post-fracture recovery, and neurological
              rehabilitation. Treatment plans are individualized—combining manual
              therapy, therapeutic exercise, and modern modalities—to match each
              patient&apos;s lifestyle and goals.
            </p>
            <h3>Qualifications &amp; highlights</h3>
            <ul>
              <li>MPT — Orthopaedic Physiotherapy</li>
              <li>Hands-on experience across musculoskeletal &amp; neuro cases</li>
              <li>Focus on patient education and long-term prevention</li>
            </ul>
            <h3>Philosophy of care</h3>
            <p>
              Dr. Prajapati believes recovery works best when patients
              understand their condition and actively participate in rehab. Every
              session is built on clear communication, measurable progress, and
              compassionate support—so you can move better and live with
              confidence.
            </p>
          </div>
        </div>
        </Reveal>
      </section>

      <section className="section mission">
        <Reveal>
          <div className="container">
          <h2 className="section-title">Our Mission</h2>
          <p className="mission__lead">
            To deliver trustworthy, modern physiotherapy that puts patients
            first—right here in Ujjain.
          </p>
          <div className="mission__pillars">
            <article>
              <span className="mission__icon" aria-hidden>
                🤝
              </span>
              <h3>Personalized Care</h3>
              <p>
                Plans tailored to your pain, function, and daily activities—not
                one-size-fits-all routines.
              </p>
            </article>
            <article>
              <span className="mission__icon" aria-hidden>
                ⚙️
              </span>
              <h3>Modern Techniques</h3>
              <p>
                Evidence-based methods and quality equipment to support faster,
                safer recovery.
              </p>
            </article>
            <article>
              <span className="mission__icon" aria-hidden>
                ❤️
              </span>
              <h3>Patient-First Approach</h3>
              <p>
                Clear guidance, honest timelines, and encouragement at every
                step of your journey.
              </p>
            </article>
          </div>
        </div>
        </Reveal>
      </section>

      <CTABanner />
    </>
  )
}
