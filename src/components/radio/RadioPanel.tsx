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
  offline: { label: 'Offline', hint: 'Connect to start chirping' },
  connecting: { label: 'Tuning', hint: 'Finding your signal' },
  ready: { label: 'Ready', hint: 'Hold Space to chirp' },
  'ptt-request': { label: 'Opening mic', hint: 'One sec' },
  transmitting: { label: 'Live', hint: 'Release to stop' },
  incoming: { label: 'Incoming', hint: 'Someone is tuning in' },
  receiving: { label: 'Listening', hint: 'Incoming chirp' },
}

function getHint(session: RadioSession) {
  if (session.status === 'incoming' && session.activePeerName) return `${session.activePeerName} is tuning in`
  if (session.status === 'receiving' && session.activePeerName) return `${session.activePeerName} is chirping`
  return statusCopy[session.status].hint
}

export function RadioPanel({ session, onPress, onRelease }: RadioPanelProps) {
  const copy = statusCopy[session.status]
  const hint = getHint(session)

  return (
    <main className="radio-panel" data-state={session.status} aria-live="polite">
      <FrequencyDisplay session={session} />

      <section className="radio-center">
        <PushToTalkButton status={session.status} onPress={onPress} onRelease={onRelease} />
        <SignalWaves status={session.status} />

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            className="radio-copy"
            key={`${copy.label}-${hint}`}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.16 }}
          >
            <strong>{copy.label}</strong>
            <span>{hint}</span>
          </motion.div>
        </AnimatePresence>
      </section>

      <div className="radio-shortcut-minimal" aria-hidden="true">
        <kbd>Space</kbd>
        <span>push to talk</span>
      </div>
    </main>
  )
}
