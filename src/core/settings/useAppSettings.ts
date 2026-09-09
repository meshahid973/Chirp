import { useCallback, useEffect, useState } from 'react'
import type { AppSettings } from '@/core/settings/settings.types'
import { readSettings, writeSettings } from '@/core/settings/settings.storage'
import { applyTheme } from '@/themes/applyTheme'
import { getTheme } from '@/themes/registry'

export function useAppSettings() {
  const [settings, setSettings] = useState<AppSettings>(readSettings)

  useEffect(() => {
    const normalizedTheme = getTheme(settings.themeId)
    applyTheme(normalizedTheme)
    document.documentElement.dataset.reducedMotion = String(settings.reducedMotion)
    writeSettings({ ...settings, themeId: normalizedTheme.id })
  }, [settings])

  const setTheme = useCallback((themeId: string) => {
    const theme = getTheme(themeId)
    setSettings((current) => ({ ...current, themeId: theme.id }))
  }, [])

  const setReducedMotion = useCallback((reducedMotion: boolean) => {
    setSettings((current) => ({ ...current, reducedMotion }))
  }, [])

  return {
    settings,
    setTheme,
    setReducedMotion,
  }
}
