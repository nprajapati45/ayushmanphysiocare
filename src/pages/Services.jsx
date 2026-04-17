import { Link } from 'react-router-dom'
import {
  GiBackPain,
  GiFrozenBlock,
  GiJoint,
  GiKneeBandage,
  GiMuscleUp,
  GiNeckBite,
  GiShoulderArmor,
  GiSpinalCoil,
} from 'react-icons/gi'
import {
  FaBandAid,
  FaBone,
  FaBrain,
  FaHands,
  FaUserInjured,
  FaWheelchair,
} from 'react-icons/fa'
import { MdOutlineSportsSoccer } from 'react-icons/md'
import { motion } from 'framer-motion'
import { services } from '../data/services'
import { Reveal } from '../components/Reveal'
import './services.css'

const ease = [0.22, 1, 0.36, 1]

const ICONS_BY_SLUG = {
  'back-pain': GiBackPain,
  'neck-pain': GiNeckBite,
  'knee-pain': GiKneeBandage,
  'shoulder-pain': GiShoulderArmor,
  sciatica: FaBrain,
  'cervical-spondylosis': GiSpinalCoil,
  'lumbar-spondylosis': FaBone,
  'slip-disc': FaUserInjured,
  'sports-injury-rehabilitation': MdOutlineSportsSoccer,
  'post-fracture-rehabilitation': FaBandAid,
  'paralysis-rehabilitation': FaWheelchair,
  arthritis: GiJoint,
  'frozen-shoulder': GiFrozenBlock,
  'muscle-pain': GiMuscleUp,
  'joint-stiffness': FaHands,
}

export default function Services() {
  return (
    <>
      <section className="services-page-hero">
        <motion.div
          className="container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease }}
        >
          <h1>Our Services</h1>
          <p>
            Comprehensive physiotherapy for spine, joints, sports injuries, and
            neurological recovery—personalized for you.
          </p>
        </motion.div>
      </section>

      <section className="section">
        <Reveal>
          <div className="container services-page-grid">
            {services.map((svc) => {
              const Icon = ICONS_BY_SLUG[svc.slug]
              return (
                <Link
                  key={svc.slug}
                  to={`/services/${svc.slug}`}
                  className="services-page-card-link"
                >
                  <motion.article
                    className="services-page-card"
                    whileHover={{ y: -4 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                  >
                    <div className="services-page-card__icon">
                      {Icon && <Icon aria-hidden />}
                    </div>
                    <h2>{svc.cardTitle}</h2>
                    <p>{svc.description}</p>
                  </motion.article>
                </Link>
              )
            })}
          </div>
        </Reveal>
      </section>
    </>
  )
}
