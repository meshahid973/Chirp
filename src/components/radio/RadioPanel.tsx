import type { RadioSession } from '@/core/radio/radio.types'
import { PushToTalkButton } from '@/components/radio/PushToTalkButton'

interface RadioPanelProps {
  session: RadioSession
  onPress: () => void
  onRelease: () => void
}

const statusCopy = {
  offline: { label: 'OFFLINE', hint: 'connect to start chirping' },
  connecting: { label: 'TUNING', hint: 'finding your signal' },
  ready: { label: 'READY', hint: 'hold space to chirp' },
  'ptt-request': { label: 'TUNING', hint: 'opening the mic' },
  transmitting: { label: 'LIVE', hint: 'release to stop' },
  incoming: { label: 'INCOMING', hint: 'someone is tuning in' },
  receiving: { label: 'RECEIVING', hint: 'incoming chirp' },
} as const

export function RadioPanel({ session, onPress, onRelease }: RadioPanelProps) {
  const copy = statusCopy[session.status]

  return (
    <main className="radio-panel" aria-live="polite">
      <section className="frequency" aria-label={`Radio ${session.frequency}, ${session.name}`}>
        <div className="frequency__eyebrow">CHIRP RADIO</div>
        <div className="frequency__value">{session.frequency}</div>
        <div className="frequency__name">{session.name}</div>
      </section>

      <section className="radio-panel__ptt">
        <PushToTalkButton
          status={session.status}
          onPress={onPress}
          onRelease={onRelease}
        />

        <div className="radio-status" data-state={session.status}>
          <span className="radio-status__dot" aria-hidden="true" />
          <span>{copy.label}</span>
        </div>
        <p className="radio-panel__hint">{copy.hint}</p>
      </section>
    </main>
  )
}
