import { motion } from 'framer-motion'

/** Keep threshold low: a tall block (e.g. services grid) rarely has 20% visible on mobile. */
const viewport = {
  once: true,
  margin: '0px',
  amount: 'some',
}

const ease = [0.22, 1, 0.36, 1]

export function Reveal({ children, className, delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.55, ease, delay }}
    >
      {children}
    </motion.div>
  )
}
