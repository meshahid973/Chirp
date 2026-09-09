import type { PointerEvent } from 'react'
import type { RadioStatus } from '@/core/radio/radio.types'

interface PushToTalkButtonProps {
  status: RadioStatus
  onPress: () => void
  onRelease: () => void
}

const enabledStates = new Set<RadioStatus>(['ready', 'ptt-request', 'transmitting'])

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
    <button
      className="ptt-button"
      data-state={status}
      type="button"
      disabled={!enabled}
      aria-label={active ? 'Release to stop chirping' : 'Hold to chirp'}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={onRelease}
      onContextMenu={(event) => event.preventDefault()}
    >
      <span className="ptt-button__ring ptt-button__ring--outer" aria-hidden="true" />
      <span className="ptt-button__ring ptt-button__ring--middle" aria-hidden="true" />
      <span className="ptt-button__core" aria-hidden="true">
        <span className="ptt-button__signal" />
      </span>
    </button>
  )
}
