import type { ThemeDefinition } from '@/themes/theme.types'

const chirpTheme: ThemeDefinition = {
  id: 'chirp',
  name: 'Chirp',
  description: 'OLED black · soft white',
  tokens: {
    background: {
      base: '#050505',
      elevated: '#0b0b0c',
      hover: '#121214',
    },
    text: {
      primary: '#f4f4f0',
      secondary: '#a6a6a1',
      muted: '#666662',
    },
    accent: {
      primary: '#f1f1ec',
      soft: 'rgba(241, 241, 236, 0.12)',
      glow: 'rgba(241, 241, 236, 0.18)',
    },
    radio: {
      idle: '#8b8b87',
      connecting: '#f0cf89',
      transmitting: '#9df4b6',
      receiving: '#93bdf7',
    },
    border: {
      normal: 'rgba(255, 255, 255, 0.08)',
      active: 'rgba(255, 255, 255, 0.18)',
    },
    radius: {
      small: '8px',
      medium: '14px',
      large: '24px',
      pill: '999px',
    },
    motion: {
      fast: '110ms',
      normal: '190ms',
      slow: '360ms',
    },
    effect: {
      blur: '18px',
      glow: '36px',
      noiseOpacity: '0.018',
    },
  },
}

const signalTheme: ThemeDefinition = {
  id: 'signal',
  name: 'Signal',
  description: 'radio green · low light',
  tokens: {
    background: {
      base: '#030705',
      elevated: '#07100b',
      hover: '#0b1710',
    },
    text: {
      primary: '#dfffe9',
      secondary: '#82a98e',
      muted: '#4f6857',
    },
    accent: {
      primary: '#8dffac',
      soft: 'rgba(141, 255, 172, 0.12)',
      glow: 'rgba(141, 255, 172, 0.22)',
    },
    radio: {
      idle: '#6f987b',
      connecting: '#d6d97b',
      transmitting: '#8dffac',
      receiving: '#78d9ff',
    },
    border: {
      normal: 'rgba(141, 255, 172, 0.09)',
      active: 'rgba(141, 255, 172, 0.24)',
    },
    radius: {
      small: '6px',
      medium: '12px',
      large: '20px',
      pill: '999px',
    },
    motion: {
      fast: '100ms',
      normal: '170ms',
      slow: '320ms',
    },
    effect: {
      blur: '14px',
      glow: '30px',
      noiseOpacity: '0.03',
    },
  },
}

export const availableThemes = [chirpTheme, signalTheme] as const

export function getTheme(themeId: string): ThemeDefinition {
  return availableThemes.find((theme) => theme.id === themeId) ?? chirpTheme
}
