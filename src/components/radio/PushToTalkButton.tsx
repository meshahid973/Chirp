import type { PointerEvent } from 'react'
import { motion } from 'motion/react'
import type { RadioStatus } from '@/core/radio/radio.types'
import { Icon } from '@/components/ui/Icon'

interface PushToTalkButtonProps {
  status: RadioStatus
  onPress: () => void
  onRelease: () => void
}

const enabledStates = new Set<RadioStatus>(['ready', 'ptt-request', 'transmitting'])

const label: Record<RadioStatus, string> = {
  offline: 'OFF',
  connecting: 'WAIT',
  ready: 'HOLD',
  'ptt-request': 'OPEN',
  transmitting: 'LIVE',
  incoming: 'WAIT',
  receiving: 'LISTEN',
}

export function PushToTalkButton({ status, onPress, onRelease }: PushToTalkButtonProps) {
  const enabled = enabledStates.has(status)
  const active = status === 'ptt-request' || status === 'transmitting'

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (!enabled || event.button !== 0) return
    event.currentTarget.setPointerCapture(event.pointerId)
    onPress()
  }

  const handlePointerUp = (event: PointerEvent<HTMLButtonElement>) => {
    if (!active) return
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    onRelease()
  }

  return (
    <motion.button
      className="ptt-button"
      data-state={status}
      type="button"
      disabled={!enabled}
      aria-pressed={active}
      aria-label={active ? 'Release to stop chirping' : 'Hold to chirp'}
      whileHover={enabled ? { scale: 1.025 } : undefined}
      whileTap={enabled ? { scale: 0.95 } : undefined}
      transition={{ type: 'spring', stiffness: 520, damping: 30 }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={active ? onRelease : undefined}
      onContextMenu={(event) => event.preventDefault()}
    >
      <span className="ptt-button__pulse" aria-hidden="true" />
      <span className="ptt-button__core">
        <Icon name="mic" size={24} />
        <span>{label[status]}</span>
      </span>
    </motion.button>
  )
}
