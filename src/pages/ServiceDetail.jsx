import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getServiceBySlug } from '../data/services'
import { PHONE_TEL } from '../constants'
import './service-detail.css'

const ease = [0.22, 1, 0.36, 1]

export default function ServiceDetail() {
  const { serviceSlug } = useParams()
  const service = serviceSlug ? getServiceBySlug(serviceSlug) : undefined

  if (!service) {
    return (
      <div className="service-detail-not-found">
        <h1>Service not found.</h1>
        <p>The service you are looking for does not exist or may have been moved.</p>
        <Link className="btn btn--primary" to="/services">
          Back to Services
        </Link>
      </div>
    )
  }

  const paragraphs = service.content.trim().split(/\n\n+/)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease }}
    >
      <section className="service-detail-hero">
        <div className="container">
          <nav className="service-detail-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden>/</span>
            <Link to="/services">Services</Link>
            <span aria-hidden>/</span>
            <span>{service.cardTitle}</span>
          </nav>
        </div>
      </section>

      <section className="service-detail-main">
        <div className="container">
          <div className="service-detail-grid">
            <motion.div
              className="service-detail-media"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
            >
              <div className="service-detail-media__frame">
                <motion.img
                  src={service.image}
                  alt={service.title}
                  loading="eager"
                  decoding="async"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.35, ease }}
                />
              </div>
            </motion.div>

            <motion.div
              className="service-detail-body"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease }}
            >
              <h1 className="service-detail-body__title">{service.title}</h1>

              <h2 className="service-detail-body__section-title">Condition overview</h2>
              <p className="service-detail-lead">{service.description}</p>

              <h2 className="service-detail-body__section-title">Treatment description</h2>
              {paragraphs.map((block, i) => (
                <p key={i} className="service-detail-content">
                  {block.trim()}
                </p>
              ))}

              <h3 className="service-detail-body__treatments-heading">Treatment approach</h3>
              <ul className="service-detail-treatments">
                {service.treatments.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>

              <div className="service-detail-inline-cta">
                <a className="btn btn--accent" href={PHONE_TEL}>
                  📞 Call for Appointment
                </a>
                <Link className="btn btn--ghost" to="/contact">
                  Book Appointment
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
