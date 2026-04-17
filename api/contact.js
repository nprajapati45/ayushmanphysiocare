/**
 * Vercel Serverless: POST /api/contact
 * Deploy the repo on Vercel, set GMAIL_USER & GMAIL_APP_PASSWORD in Project → Environment Variables.
 * If the API runs on a different origin than the site, set VITE_CONTACT_API_URL at build time to this function’s URL.
 */
import { handleContactPost } from '../server/contactMail.js'

const defaultAllowed = new Set([
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://ayushmanphysiocare.com',
  'https://www.ayushmanphysiocare.com',
])

function allowedOrigins() {
  const s = new Set(defaultAllowed)
  const extra = process.env.CORS_ORIGINS
  if (extra) {
    for (const o of extra.split(',')) {
      const t = o.trim()
      if (t) s.add(t)
    }
  }
  return s
}

function applyCors(res, origin) {
  const allowed = allowedOrigins()
  const headers = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  }
  if (origin && allowed.has(origin)) {
    headers['Access-Control-Allow-Origin'] = origin
    headers['Access-Control-Allow-Credentials'] = 'true'
  }
  for (const [k, v] of Object.entries(headers)) {
    res.setHeader(k, v)
  }
}

export default async function handler(req, res) {
  const origin = req.headers.origin
  applyCors(res, origin)

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' })
  }

  let body = req.body
  if (body === undefined || body === null) {
    body = {}
  } else if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      body = {}
    }
  }

  const out = await handleContactPost(body, process.env)
  return res.status(out.status).json(out.body)
}
