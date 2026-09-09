import { useCallback, useEffect, useReducer, useRef } from 'react'
import { createInitialRadioSession, radioReducer } from '@/core/radio/radio.machine'

const BOOT_TUNE_DELAY_MS = 420
const MOCK_PTT_GRANT_DELAY_MS = 130

export function useRadioController() {
  const [session, dispatch] = useReducer(radioReducer, undefined, createInitialRadioSession)
  const grantTimer = useRef<number | null>(null)

  const clearGrantTimer = useCallback(() => {
    if (grantTimer.current === null) return
    window.clearTimeout(grantTimer.current)
    grantTimer.current = null
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => dispatch({ type: 'CONNECTED' }), BOOT_TUNE_DELAY_MS)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => clearGrantTimer, [clearGrantTimer])

  const startTransmission = useCallback(() => {
    if (session.status !== 'ready') return

    dispatch({ type: 'PTT_PRESS' })
    clearGrantTimer()
    grantTimer.current = window.setTimeout(() => {
      grantTimer.current = null
      dispatch({ type: 'PTT_GRANTED' })
    }, MOCK_PTT_GRANT_DELAY_MS)
  }, [clearGrantTimer, session.status])

  const stopTransmission = useCallback(() => {
    clearGrantTimer()
    dispatch({ type: 'PTT_RELEASE' })
  }, [clearGrantTimer])

  return {
    session,
    startTransmission,
    stopTransmission,
  }
}
