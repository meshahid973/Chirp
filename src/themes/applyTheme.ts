import type { ThemeDefinition } from '@/themes/theme.types'

export function applyTheme(theme: ThemeDefinition) {
  const { tokens } = theme
  const variables: Record<string, string> = {
    '--bg-base': tokens.background.base,
    '--bg-elevated': tokens.background.elevated,
    '--bg-hover': tokens.background.hover,
    '--text-primary': tokens.text.primary,
    '--text-secondary': tokens.text.secondary,
    '--text-muted': tokens.text.muted,
    '--accent-primary': tokens.accent.primary,
    '--accent-soft': tokens.accent.soft,
    '--accent-glow': tokens.accent.glow,
    '--radio-idle': tokens.radio.idle,
    '--radio-connecting': tokens.radio.connecting,
    '--radio-transmitting': tokens.radio.transmitting,
    '--radio-receiving': tokens.radio.receiving,
    '--border-normal': tokens.border.normal,
    '--border-active': tokens.border.active,
    '--radius-sm': tokens.radius.small,
    '--radius-md': tokens.radius.medium,
    '--radius-lg': tokens.radius.large,
    '--radius-pill': tokens.radius.pill,
    '--motion-fast': tokens.motion.fast,
    '--motion-normal': tokens.motion.normal,
    '--motion-slow': tokens.motion.slow,
    '--effect-blur': tokens.effect.blur,
    '--effect-glow': tokens.effect.glow,
    '--effect-noise-opacity': tokens.effect.noiseOpacity,
  }

  const root = document.documentElement
  root.dataset.theme = theme.id

  for (const [property, value] of Object.entries(variables)) {
    root.style.setProperty(property, value)
  }
}
