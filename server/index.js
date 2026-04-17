import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { handleContactPost } from './contactMail.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: join(__dirname, '..', '.env') })

const app = express()
const PORT = process.env.PORT || 5000

const defaultOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://ayushmanphysiocare.com',
  'https://www.ayushmanphysiocare.com',
]
const corsOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map((o) => o.trim()).filter(Boolean)
  : defaultOrigins

app.use(
  cors({
    origin: corsOrigins,
    credentials: true,
  })
)
app.use(express.json())

app.post('/api/contact', async (req, res) => {
  const out = await handleContactPost(req.body || {}, process.env)
  return res.status(out.status).json(out.body)
})

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`)
})
