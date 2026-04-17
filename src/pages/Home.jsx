import { useRef, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { FaQuoteLeft, FaWheelchair } from 'react-icons/fa'
import { GiBackPain, GiJoint, GiBrain } from 'react-icons/gi'
import { MdOutlineSportsSoccer } from 'react-icons/md'
import { FaHandHoldingMedical } from 'react-icons/fa6'
import { useCountUp, useInViewOnce } from '../hooks/useCountUp'
import { CTABanner } from '../components/CTABanner'
import { Reveal } from '../components/Reveal'
import {
  DOCTOR_IMG,
  GALLERY_IMAGES,
  HERO_BG,
  HOME_SERVICE_CARDS,
  PHONE_TEL,
} from '../constants'
import './home.css'

const heroEase = [0.22, 1, 0.36, 1]

const heroParent = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.06 },
  },
}

const heroChild = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: heroEase },
  },
}

const serviceIcons = {
  bone: GiBackPain,
  knee: GiJoint,
  sciatica: GiBrain,
  sports: MdOutlineSportsSoccer,
  neuro: FaWheelchair,
  arthritis: FaHandHoldingMedical,
}

function HeroSection() {
  return (
    <section
      className="home-hero"
      style={{ backgroundImage: `url(${HERO_BG})` }}
    >
      <div className="home-hero__overlay" aria-hidden />
      <motion.div
        className="home-hero__content"
        variants={heroParent}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="home-hero__title" variants={heroChild}>
          Advanced Physiotherapy Care
        </motion.h1>
        <motion.p className="home-hero__sub" variants={heroChild}>
          Modern Techniques. Proven Results. Personalized Recovery.
        </motion.p>
        <motion.div className="home-hero__actions" variants={heroChild}>
          <a className="btn btn--accent" href={PHONE_TEL}>
            📞 Call for Appointment
          </a>
          <Link className="btn btn--outline-light" to="/services">
            Explore Services
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}

function StatsBar() {
  const ref = useRef(null)
  const visible = useInViewOnce(ref)
  const c50 = useCountUp(50, 1400, visible)
  const c2 = useCountUp(2, 1200, visible)
  const c15 = useCountUp(15, 1200, visible)

  return (
    <section className="stats-bar" ref={ref} aria-label="Clinic statistics">
      <Reveal className="stats-bar__reveal">
        <div className="container stats-bar__grid">
          <div>
            <p className="stats-bar__num">{c50}+</p>
            <p className="stats-bar__label">Patients Treated</p>
          </div>
          <div>
            <p className="stats-bar__num">{c2}+</p>
            <p className="stats-bar__label">Years Experience</p>
          </div>
          <div>
            <p className="stats-bar__num">{c15}+</p>
            <p className="stats-bar__label">Conditions Treated</p>
          </div>
          <div>
            <p className="stats-bar__emph">Modern Equipment</p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function AboutDoctor() {
  return (
    <section className="section">
      <Reveal>
        <div className="container about-doctor">
          <div className="about-doctor__img-wrap">
            <img
              src={DOCTOR_IMG}
              alt="Dr. Nitesh Prajapati, physiotherapist"
              width={600}
              height={400}
              loading="lazy"
            />
          </div>
          <div>
            <h2 style={{ margin: '0 0 0.5rem', textAlign: 'left' }}>
              Dr. Nitesh Prajapati
            </h2>
            <p className="about-doctor__qual">MPT Orthopaedics</p>
            <p style={{ margin: '0 0 1.25rem', color: '#3d3d52' }}>
              Dr. Nitesh Prajapati is a qualified physiotherapist with a
              Master&apos;s degree in Orthopaedic Physiotherapy. With years of
              hands-on experience treating musculoskeletal and neurological
              conditions, he is committed to delivering advanced,
              evidence-based physiotherapy using modern techniques and
              state-of-the-art equipment. He believes every patient deserves a
              personalized recovery journey.
            </p>
            <Link to="/about">Read More →</Link>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function ServicesPreview() {
  return (
    <section className="section" style={{ background: '#fff' }}>
      <Reveal>
        <div className="container">
          <h2 className="section-title">Conditions We Treat</h2>
          <div className="services-grid">
            {HOME_SERVICE_CARDS.map((item) => {
              const Icon = serviceIcons[item.icon]
              return (
                <Link
                  key={item.title}
                  to={item.detailPath}
                  className="home-service-card-link"
                >
                  <motion.article
                    className="service-card"
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                  >
                    <div className="service-card__icon">
                      <Icon aria-hidden />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </motion.article>
                </Link>
              )
            })}
          </div>
          <div className="view-all-wrap">
            <Link className="btn btn--primary" to="/services">
              View All Services
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function WhyChooseUs() {
  const items = [
    { t: 'Advanced Equipment', d: 'Modern modalities for faster recovery' },
    { t: 'Personalized Treatment Plans', d: 'Care tailored to your goals' },
    { t: 'Experienced Specialist', d: 'Expert orthopaedic physiotherapy' },
    { t: 'Convenient Location (Ujjain)', d: 'Easy access near Nanakheda' },
  ]
  return (
    <section className="section">
      <Reveal>
        <div className="container">
          <h2 className="section-title">Why Choose Us</h2>
          <div className="why-grid">
            {items.map((item) => (
              <div key={item.t} className="why-item">
                <div className="why-item__icon" aria-hidden>
                  ✅
                </div>
                <h3>{item.t}</h3>
                <p>{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function FacilitiesGallery() {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const slides = useMemo(
    () => GALLERY_IMAGES.map((src) => ({ src })),
    []
  )

  return (
    <section className="section" id="facilities">
      <Reveal>
        <div className="container">
          <h2 className="section-title">Our Clinic &amp; Facilities</h2>
          <div className="gallery-grid">
            {GALLERY_IMAGES.map((src, i) => (
              <motion.button
                key={src}
                type="button"
                className="gallery-grid__btn"
                onClick={() => {
                  setIndex(i)
                  setOpen(true)
                }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.35, ease: heroEase }}
              >
                <img src={src} alt={`Clinic facility ${i + 1}`} loading="lazy" />
              </motion.button>
            ))}
          </div>
          <Lightbox
            open={open}
            close={() => setOpen(false)}
            index={index}
            slides={slides}
            on={{ view: ({ index: idx }) => setIndex(idx) }}
          />
        </div>
      </Reveal>
    </section>
  )
}

function Testimonials() {
  const reviews = [
    {
      name: 'Patient A',
      initials: 'PA',
      text:
        "Dr. Nitesh's treatment for my slip disc was exceptional. I was back to normal in 3 weeks!",
    },
    {
      name: 'Patient B',
      initials: 'PB',
      text:
        'Highly professional and caring. My knee pain is completely gone after the physiotherapy sessions.',
    },
    {
      name: 'Patient C',
      initials: 'PC',
      text:
        'Best physiotherapy clinic in Ujjain. Modern techniques and very effective treatment.',
    },
  ]

  return (
    <section className="section" style={{ background: '#fff' }}>
      <Reveal>
        <div className="container">
          <h2 className="section-title">What Our Patients Say</h2>
          <div className="testimonials-grid">
            {reviews.map((r) => (
              <article key={r.name} className="testimonial-card">
                <span className="testimonial-card__quote" aria-hidden>
                  <FaQuoteLeft />
                </span>
                <div className="testimonial-card__header">
                  <div className="testimonial-card__avatar">{r.initials}</div>
                  <div>
                    <strong>{r.name}</strong>
                    <div className="testimonial-card__stars">★★★★★</div>
                  </div>
                </div>
                <blockquote>{r.text}</blockquote>
              </article>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <AboutDoctor />
      <ServicesPreview />
      <WhyChooseUs />
      <FacilitiesGallery />
      <Testimonials />
      <CTABanner />
    </>
  )
}
