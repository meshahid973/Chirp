import { AnimatePresence, motion } from 'motion/react'
import type { RadioSession, RadioStatus } from '@/core/radio/radio.types'
import { FrequencyDisplay } from '@/components/radio/FrequencyDisplay'
import { PushToTalkButton } from '@/components/radio/PushToTalkButton'
import { SignalWaves } from '@/components/radio/SignalWaves'

interface RadioPanelProps {
  session: RadioSession
  onPress: () => void
  onRelease: () => void
}

const statusCopy: Record<RadioStatus, { label: string; hint: string }> = {
  offline: { label: 'OFFLINE', hint: 'connect to start chirping' },
  connecting: { label: 'TUNING', hint: 'finding your signal' },
  ready: { label: 'READY', hint: 'hold to chirp' },
  'ptt-request': { label: 'TUNING', hint: 'opening the mic' },
  transmitting: { label: 'LIVE', hint: 'release when you are done' },
  incoming: { label: 'INCOMING', hint: 'someone is tuning in' },
  receiving: { label: 'RECEIVING', hint: 'incoming chirp' },
}

function getStatusHint(session: RadioSession) {
  if (session.status === 'incoming' && session.activePeerName) {
    return `${session.activePeerName} is tuning in`
  }

  if (session.status === 'receiving' && session.activePeerName) {
    return `${session.activePeerName} is chirping`
  }

  return statusCopy[session.status].hint
}

export function RadioPanel({ session, onPress, onRelease }: RadioPanelProps) {
  const copy = statusCopy[session.status]
  const hint = getStatusHint(session)
  const shortcutCopy = session.status === 'transmitting' ? 'release to stop' : 'hold to chirp'

  return (
    <main className="radio-panel" data-state={session.status} aria-live="polite">
      <FrequencyDisplay session={session} />

      <motion.section
        className="radio-stage"
        data-state={session.status}
        layout
        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
      >
        <span className="radio-stage__loop radio-stage__loop--one" aria-hidden="true" />
        <span className="radio-stage__loop radio-stage__loop--two" aria-hidden="true" />
        <span className="radio-stage__spark radio-stage__spark--one" aria-hidden="true">✦</span>
        <span className="radio-stage__spark radio-stage__spark--two" aria-hidden="true">✧</span>

        <div className="radio-stage__topline">
          <div className="radio-stage__status" data-state={session.status}>
            <span className="radio-stage__status-dot" aria-hidden="true" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={copy.label}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.16 }}
              >
                {copy.label}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="radio-stage__mode">PTT</span>
        </div>

        <div className="radio-stage__center">
          <PushToTalkButton status={session.status} onPress={onPress} onRelease={onRelease} />
          <SignalWaves status={session.status} />
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            className="radio-stage__hint"
            key={hint}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 0.72, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
          >
            {hint}
          </motion.p>
        </AnimatePresence>
      </motion.section>

      <motion.div
        className="radio-shortcut"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.25 }}
      >
        <kbd>SPACE</kbd>
        <span>{shortcutCopy}</span>
      </motion.div>
    </main>
  )
}
