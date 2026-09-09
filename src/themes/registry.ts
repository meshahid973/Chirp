import type { ThemeDefinition } from '@/themes/theme.types'

const chirpTheme: ThemeDefinition = {
  id: 'chirp',
  name: 'Chirp',
  description: 'violet · acid yellow',
  mode: 'dark',
  tokens: {
    background: {
      base: '#09090c',
      elevated: '#111116',
      hover: '#191920',
    },
    text: {
      primary: '#faf9f6',
      secondary: '#b6b3bd',
      muted: '#716f79',
    },
    accent: {
      primary: '#8d78ff',
      soft: 'rgba(141, 120, 255, 0.16)',
      glow: 'rgba(141, 120, 255, 0.3)',
    },
    radio: {
      idle: '#c4baff',
      connecting: '#ffb761',
      transmitting: '#f4e94f',
      receiving: '#6fddff',
    },
    border: {
      normal: 'rgba(255, 255, 255, 0.08)',
      active: 'rgba(255, 255, 255, 0.17)',
    },
    radius: {
      small: '10px',
      medium: '18px',
      large: '30px',
      pill: '999px',
    },
    motion: {
      fast: '110ms',
      normal: '190ms',
      slow: '380ms',
    },
    effect: {
      blur: '20px',
      glow: '46px',
      noiseOpacity: '0.016',
    },
  },
}

const signalTheme: ThemeDefinition = {
  id: 'signal',
  name: 'Signal',
  description: 'radio green · low light',
  mode: 'dark',
  tokens: {
    background: {
      base: '#040806',
      elevated: '#08110c',
      hover: '#0d1a12',
    },
    text: {
      primary: '#e6ffed',
      secondary: '#92b79c',
      muted: '#58705f',
    },
    accent: {
      primary: '#72ef9a',
      soft: 'rgba(114, 239, 154, 0.14)',
      glow: 'rgba(114, 239, 154, 0.28)',
    },
    radio: {
      idle: '#80ad8e',
      connecting: '#e2d967',
      transmitting: '#9aff6f',
      receiving: '#72dfff',
    },
    border: {
      normal: 'rgba(114, 239, 154, 0.09)',
      active: 'rgba(114, 239, 154, 0.24)',
    },
    radius: {
      small: '8px',
      medium: '14px',
      large: '24px',
      pill: '999px',
    },
    motion: {
      fast: '100ms',
      normal: '170ms',
      slow: '340ms',
    },
    effect: {
      blur: '16px',
      glow: '36px',
      noiseOpacity: '0.025',
    },
  },
}

const sorbetTheme: ThemeDefinition = {
  id: 'sorbet',
  name: 'Sorbet',
  description: 'powder blue · bubblegum',
  mode: 'light',
  tokens: {
    background: {
      base: '#e8eefc',
      elevated: '#f8f9ff',
      hover: '#dde6fb',
    },
    text: {
      primary: '#11131a',
      secondary: '#50586a',
      muted: '#8a93a7',
    },
    accent: {
      primary: '#82a7ff',
      soft: 'rgba(130, 167, 255, 0.22)',
      glow: 'rgba(130, 167, 255, 0.28)',
    },
    radio: {
      idle: '#6f7f9f',
      connecting: '#ff9f72',
      transmitting: '#f18be7',
      receiving: '#58caef',
    },
    border: {
      normal: 'rgba(17, 19, 26, 0.09)',
      active: 'rgba(17, 19, 26, 0.2)',
    },
    radius: {
      small: '12px',
      medium: '20px',
      large: '32px',
      pill: '999px',
    },
    motion: {
      fast: '115ms',
      normal: '200ms',
      slow: '400ms',
    },
    effect: {
      blur: '22px',
      glow: '48px',
      noiseOpacity: '0.01',
    },
  },
}

export const availableThemes = [chirpTheme, signalTheme, sorbetTheme] as const

export function getTheme(themeId: string): ThemeDefinition {
  return availableThemes.find((theme) => theme.id === themeId) ?? chirpTheme
}
