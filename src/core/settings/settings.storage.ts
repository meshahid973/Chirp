import type { AppSettings } from '@/core/settings/settings.types'

const STORAGE_KEY = 'chirp.settings.v1'

function defaultSettings(): AppSettings {
  return {
    themeId: 'chirp',
    reducedMotion: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false,
  }
}

export function readSettings(): AppSettings {
  const fallback = defaultSettings()

  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    if (!value) return fallback

    const parsed = JSON.parse(value) as Partial<AppSettings>

    return {
      themeId: typeof parsed.themeId === 'string' ? parsed.themeId : fallback.themeId,
      reducedMotion:
        typeof parsed.reducedMotion === 'boolean' ? parsed.reducedMotion : fallback.reducedMotion,
    }
  } catch {
    return fallback
  }
}

export function writeSettings(settings: AppSettings) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  } catch {
    return
  }
}
