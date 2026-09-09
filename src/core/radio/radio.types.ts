export type RadioStatus =
  | 'offline'
  | 'connecting'
  | 'ready'
  | 'ptt-request'
  | 'transmitting'
  | 'incoming'
  | 'receiving'

export interface RadioSession {
  status: RadioStatus
  frequency: string
  name: string
  activePeerName: string | null
}

export type RadioEvent =
  | { type: 'CONNECT' }
  | { type: 'CONNECTED' }
  | { type: 'DISCONNECT' }
  | { type: 'PTT_PRESS' }
  | { type: 'PTT_GRANTED' }
  | { type: 'PTT_RELEASE' }
  | { type: 'REMOTE_TUNE'; peerName: string }
  | { type: 'REMOTE_START'; peerName: string }
  | { type: 'REMOTE_STOP' }
