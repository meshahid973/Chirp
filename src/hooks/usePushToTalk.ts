import { useEffect, useRef } from 'react'

interface PushToTalkOptions {
  enabled: boolean
  onPress: () => void
  onRelease: () => void
}

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false

  return (
    target.isContentEditable ||
    target.tagName === 'INPUT' ||
    target.tagName === 'TEXTAREA' ||
    target.tagName === 'SELECT' ||
    target.tagName === 'BUTTON'
  )
}

export function usePushToTalk({ enabled, onPress, onRelease }: PushToTalkOptions) {
  const pressed = useRef(false)

  useEffect(() => {
    const release = () => {
      if (!pressed.current) return
      pressed.current = false
      onRelease()
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!enabled || event.code !== 'Space' || event.repeat || isEditableTarget(event.target)) return

      event.preventDefault()
      pressed.current = true
      onPress()
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code !== 'Space') return
      event.preventDefault()
      release()
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    window.addEventListener('blur', release)

    if (!enabled) release()

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('blur', release)
      release()
    }
  }, [enabled, onPress, onRelease])
}
