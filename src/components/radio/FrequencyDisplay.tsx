import { motion } from 'motion/react'
import type { RadioSession } from '@/core/radio/radio.types'

interface FrequencyDisplayProps {
  session: RadioSession
}

export function FrequencyDisplay({ session }: FrequencyDisplayProps) {
  return (
    <section className="frequency-display" aria-label={`Radio ${session.frequency}, ${session.name}`}>
      <div className="frequency-display__line">
        <span className="frequency-display__prefix">CH</span>
        <motion.span
          className="frequency-display__value"
          key={session.frequency}
          initial={{ opacity: 0, y: 6, filter: 'blur(3px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        >
          {session.frequency}
        </motion.span>
      </div>
      <span className="frequency-display__name">{session.name}</span>
    </section>
  )
}
