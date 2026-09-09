import type { CSSProperties } from 'react'
import type { RadioStatus } from '@/core/radio/radio.types'

interface SignalWavesProps {
  status: RadioStatus
}

const waveBars = [0, 1, 2, 3, 4, 5, 6]

export function SignalWaves({ status }: SignalWavesProps) {
  return (
    <div className="signal-waves" data-state={status} aria-hidden="true">
      {waveBars.map((bar) => (
        <span style={{ '--wave-index': bar } as CSSProperties} key={bar} />
      ))}
    </div>
  )
}
