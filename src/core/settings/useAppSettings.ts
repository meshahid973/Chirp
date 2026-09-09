import { useCallback, useEffect, useState } from 'react'
import type { AppSettings } from '@/core/settings/settings.types'
import { readSettings, writeSettings } from '@/core/settings/settings.storage'
import { applyTheme } from '@/themes/applyTheme'
import { getTheme } from '@/themes/registry'

function loadSettings(): AppSettings {
  const stored = readSettings()

  return {
    ...stored,
    themeId: getTheme(stored.themeId).id,
  }
}

export function useAppSettings() {
  const [settings, setSettings] = useState<AppSettings>(loadSettings)

  useEffect(() => {
    applyTheme(getTheme(settings.themeId))
    document.documentElement.dataset.reducedMotion = String(settings.reducedMotion)
    writeSettings(settings)
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
