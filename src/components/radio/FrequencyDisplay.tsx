import type { CSSProperties } from 'react'
import { motion } from 'motion/react'
import type { RadioSession } from '@/core/radio/radio.types'

interface FrequencyDisplayProps {
  session: RadioSession
}

const meterTicks = Array.from({ length: 15 }, (_, index) => index)

export function FrequencyDisplay({ session }: FrequencyDisplayProps) {
  return (
    <motion.section
      className="frequency-card"
      data-state={session.status}
      aria-label={`Radio ${session.frequency}, ${session.name}`}
      initial={{ opacity: 0, y: -10, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 280, damping: 28 }}
    >
      <div className="frequency-card__orb" aria-hidden="true" />

      <div className="frequency-card__topline">
        <span className="frequency-card__eyebrow">CHIRP RADIO</span>
        <span className="frequency-card__connection" data-state={session.status}>
          <span aria-hidden="true" />
          tuned
        </span>
      </div>

      <div className="frequency-card__main">
        <span className="frequency-card__prefix">CH</span>
        <motion.span
          className="frequency-card__value"
          key={session.frequency}
          initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {session.frequency}
        </motion.span>
      </div>

      <div className="frequency-card__bottom">
        <span className="frequency-card__name">{session.name}</span>
        <div className="frequency-card__meter" aria-hidden="true">
          {meterTicks.map((tick) => (
            <span
              className="frequency-card__tick"
              data-major={tick % 3 === 1}
              style={{ '--tick-index': tick } as CSSProperties}
              key={tick}
            />
          ))}
        </div>
      </div>
    </motion.section>
  )
}
