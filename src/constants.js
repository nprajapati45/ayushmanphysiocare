import { services } from './data/services.js'
import doctorNiteshPhoto from '../asset/images/nitesh.png'

export const PHONE_DISPLAY = '+91 62639 03778'
export const PHONE_TEL = 'tel:+916263903778'
export const WHATSAPP_HREF = 'https://wa.me/916263903778'
export const EMAIL = 'ayushmanphysiocare@gmail.com'
export const CLINIC_NAME = 'Ayushman PhysioCare'
export const ADDRESS_LINES = [
  'Front of Nanakheda Police Station,',
  'A-5/23 Mahakal Vanijiy Kendra Nanakheda,',
  'Ujjain, (M.P.), 456010',
]

export const ADDRESS = ADDRESS_LINES.join('\n')

export const SOCIAL = {
  facebook: 'https://facebook.com/',
  instagram: 'https://instagram.com/',
  twitter: 'https://twitter.com/',
  whatsapp: WHATSAPP_HREF,
}

/** @type {readonly string[]} */
export const SERVICES_15 = services.map((s) => s.cardTitle)

export const HOME_SERVICE_CARDS = [
  {
    icon: 'bone',
    title: '🦴 Back & Neck Pain',
    desc: 'Relief from acute and chronic spinal pain',
    detailPath: '/services/back-pain',
  },
  {
    icon: 'knee',
    title: '🦵 Knee & Joint Pain',
    desc: 'Expert care for knee, shoulder, and joint conditions',
    detailPath: '/services/knee-pain',
  },
  {
    icon: 'sciatica',
    title: '🧠 Sciatica & Disc Problems',
    desc: 'Treatment for sciatica, slip disc, spondylosis',
    detailPath: '/services/sciatica',
  },
  {
    icon: 'sports',
    title: '🏃 Sports Injury Rehab',
    desc: 'Get back to peak performance faster',
    detailPath: '/services/sports-injury-rehabilitation',
  },
  {
    icon: 'neuro',
    title: '🦽 Paralysis & Neuro Rehab',
    desc: 'Functional recovery for neurological conditions',
    detailPath: '/services/paralysis-rehabilitation',
  },
  {
    icon: 'arthritis',
    title: '🦷 Arthritis (OA/RA)',
    desc: 'Pain management and mobility improvement',
    detailPath: '/services/arthritis',
  },
]

export const MAP_EMBED_SRC =
  'https://www.google.com/maps?q=Nanakheda+Police+Station+Ujjain+456010+Madhya+Pradesh&output=embed'

export const HERO_BG =
  'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600'

export const DOCTOR_IMG = doctorNiteshPhoto

/** Local facility photos from `asset/Facility images/` (alphabetical, max 4) */
const facilityUrlModules = import.meta.glob(
  '../asset/Facility images/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}',
  { eager: true, import: 'default' }
)
const facilityUrlsSorted = Object.keys(facilityUrlModules)
  .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
  .map((key) => facilityUrlModules[key])

const GALLERY_FALLBACK = [
  'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=600',
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600',
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600',
  'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600',
]

export const GALLERY_IMAGES =
  facilityUrlsSorted.length > 0
    ? facilityUrlsSorted.slice(0, 4)
    : GALLERY_FALLBACK
