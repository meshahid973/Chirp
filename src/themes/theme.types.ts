export type ThemeMode = 'dark' | 'light'

export interface ThemeTokens {
  background: {
    base: string
    elevated: string
    hover: string
  }
  text: {
    primary: string
    secondary: string
    muted: string
  }
  accent: {
    primary: string
    soft: string
    glow: string
  }
  radio: {
    idle: string
    connecting: string
    transmitting: string
    receiving: string
  }
  border: {
    normal: string
    active: string
  }
  radius: {
    small: string
    medium: string
    large: string
    pill: string
  }
  motion: {
    fast: string
    normal: string
    slow: string
  }
  effect: {
    blur: string
    glow: string
    noiseOpacity: string
  }
}

export interface ThemeDefinition {
  id: string
  name: string
  description: string
  mode: ThemeMode
  tokens: ThemeTokens
}
