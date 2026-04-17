import nodemailer from 'nodemailer'

export const DEFAULT_ADMIN_EMAIL = 'ayushmanphysiocare@gmail.com'

export function buildEmailHtml(body) {
  const { name, phone, email, condition, message, preferredTime } = body
  const safe = (v) =>
    String(v ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:24px;background:#f8fffe;font-family:Inter,Segoe UI,sans-serif;color:#1a1a2e;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.07);">
    <tr>
      <td style="background:#2a9d8f;padding:20px 24px;">
        <h1 style="margin:0;font-size:20px;color:#ffffff;font-family:Nunito,Segoe UI,sans-serif;">Ayushman PhysioCare</h1>
        <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.9);">New appointment request</p>
      </td>
    </tr>
    <tr>
      <td style="padding:24px;">
        <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-size:14px;">
          <tr><td style="color:#264653;font-weight:600;width:140px;">Name</td><td>${safe(name)}</td></tr>
          <tr><td style="color:#264653;font-weight:600;">Phone</td><td>${safe(phone)}</td></tr>
          <tr><td style="color:#264653;font-weight:600;">Email</td><td>${safe(email || '—')}</td></tr>
          <tr><td style="color:#264653;font-weight:600;">Condition / Service</td><td>${safe(condition)}</td></tr>
          <tr><td style="color:#264653;font-weight:600;">Preferred time</td><td>${safe(preferredTime)}</td></tr>
          <tr><td style="color:#264653;font-weight:600;vertical-align:top;">Message</td><td style="white-space:pre-wrap;">${safe(message)}</td></tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 24px;background:#f8fffe;border-top:1px solid rgba(42,157,143,0.2);font-size:12px;color:#264653;">
        Sent from Ayushman PhysioCare contact form
      </td>
    </tr>
  </table>
</body>
</html>
`
}

function normalizeMobile(phoneStr) {
  const phoneDigits = phoneStr.replace(/\D/g, '')
  if (phoneDigits.length === 12 && phoneDigits.startsWith('91')) return phoneDigits.slice(2)
  if (phoneDigits.length === 11 && phoneDigits.startsWith('0')) return phoneDigits.slice(1)
  if (phoneDigits.length === 10) return phoneDigits
  return null
}

/**
 * @param {Record<string, unknown>} body
 * @returns {{ ok: true, value: object } | { ok: false, status: number, message: string }}
 */
export function validateContactPayload(body) {
  const { name, phone, email, condition, message, preferredTime } = body || {}

  const nameStr = String(name ?? '').trim()
  const phoneStr = String(phone ?? '').trim()
  const emailStr = String(email ?? '').trim()
  const messageStr = String(message ?? '').trim()

  if (!nameStr || !phoneStr || !messageStr) {
    return { ok: false, status: 400, message: 'Name, phone, and message are required.' }
  }

  if (nameStr.length < 2 || nameStr.length > 100) {
    return { ok: false, status: 400, message: 'Invalid name.' }
  }

  const mobile = normalizeMobile(phoneStr)
  if (!mobile || mobile.length !== 10 || !/^[6-9]\d{9}$/.test(mobile)) {
    return { ok: false, status: 400, message: 'Invalid phone number.' }
  }

  if (emailStr && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailStr)) {
    return { ok: false, status: 400, message: 'Invalid email address.' }
  }

  if (messageStr.length < 10 || messageStr.length > 4000) {
    return { ok: false, status: 400, message: 'Invalid message length.' }
  }

  return {
    ok: true,
    value: {
      nameStr,
      mobile,
      emailStr,
      condition,
      messageStr,
      preferredTime,
    },
  }
}

/**
 * @param {Record<string, string | undefined>} env
 * @returns {Promise<{ status: number, body: object }>}
 */
export async function handleContactPost(rawBody, env) {
  const validated = validateContactPayload(rawBody)
  if (!validated.ok) {
    return {
      status: validated.status,
      body: { success: false, message: validated.message },
    }
  }

  const { nameStr, mobile, emailStr, condition, messageStr, preferredTime } =
    validated.value

  const adminEmail = env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL
  const gmailUser = env.GMAIL_USER
  const gmailPass = env.GMAIL_APP_PASSWORD

  if (!gmailUser || !gmailPass) {
    console.error('Missing email env: GMAIL_USER or GMAIL_APP_PASSWORD')
    return {
      status: 500,
      body: { success: false, message: 'Server email is not configured.' },
    }
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    })

    const subject = `New Appointment Request from ${nameStr}`

    await transporter.sendMail({
      from: `"Ayushman PhysioCare" <${gmailUser}>`,
      to: adminEmail,
      replyTo: emailStr || gmailUser,
      subject,
      html: buildEmailHtml({
        name: nameStr,
        phone: mobile,
        email: emailStr,
        condition,
        message: messageStr,
        preferredTime,
      }),
      text: [
        `Name: ${nameStr}`,
        `Phone: ${mobile}`,
        `Email: ${emailStr || '—'}`,
        `Condition: ${condition || '—'}`,
        `Preferred time: ${preferredTime || '—'}`,
        '',
        messageStr,
      ].join('\n'),
    })

    return { status: 200, body: { success: true, message: 'Email sent' } }
  } catch (err) {
    console.error('Contact mail error:', err)
    return {
      status: 500,
      body: { success: false, message: 'Failed to send email.' },
    }
  }
}
