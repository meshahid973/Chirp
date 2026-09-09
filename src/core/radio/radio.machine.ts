import type { RadioEvent, RadioSession } from '@/core/radio/radio.types'

export function createInitialRadioSession(): RadioSession {
  return {
    status: 'connecting',
    frequency: '104.7',
    name: 'midnight',
    activePeerName: null,
  }
}

export function radioReducer(state: RadioSession, event: RadioEvent): RadioSession {
  switch (event.type) {
    case 'CONNECT':
      return state.status === 'offline' ? { ...state, status: 'connecting' } : state

    case 'CONNECTED':
      return state.status === 'connecting' ? { ...state, status: 'ready' } : state

    case 'DISCONNECT':
      return { ...state, status: 'offline', activePeerName: null }

    case 'PTT_PRESS':
      return state.status === 'ready' ? { ...state, status: 'ptt-request' } : state

    case 'PTT_GRANTED':
      return state.status === 'ptt-request' ? { ...state, status: 'transmitting' } : state

    case 'PTT_RELEASE':
      return state.status === 'ptt-request' || state.status === 'transmitting'
        ? { ...state, status: 'ready' }
        : state

    case 'REMOTE_TUNE':
      return state.status === 'ready'
        ? { ...state, status: 'incoming', activePeerName: event.peerName }
        : state

    case 'REMOTE_START':
      return state.status === 'ready' || state.status === 'incoming'
        ? { ...state, status: 'receiving', activePeerName: event.peerName }
        : state

    case 'REMOTE_STOP':
      return state.status === 'receiving' || state.status === 'incoming'
        ? { ...state, status: 'ready', activePeerName: null }
        : state
  }
}
