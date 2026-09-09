import type { AppSettings } from '@/core/settings/settings.types'
import { availableThemes } from '@/themes/registry'
import { Icon } from '@/components/ui/Icon'

interface SettingsPanelProps {
  open: boolean
  settings: AppSettings
  onClose: () => void
  onThemeChange: (themeId: string) => void
  onReducedMotionChange: (enabled: boolean) => void
}

export function SettingsPanel({
  open,
  settings,
  onClose,
  onThemeChange,
  onReducedMotionChange,
}: SettingsPanelProps) {
  if (!open) return null

  return (
    <div className="settings-layer" role="presentation" onMouseDown={onClose}>
      <section
        className="settings-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="settings-panel__header">
          <div>
            <p className="settings-panel__eyebrow">CHIRP</p>
            <h2 id="settings-title">Preferences</h2>
          </div>
          <button className="icon-button" type="button" aria-label="Close settings" onClick={onClose}>
            <Icon name="close" size={15} />
          </button>
        </header>

        <div className="settings-section">
          <div className="settings-section__heading">
            <span>Appearance</span>
            <span className="settings-section__meta">token driven</span>
          </div>

          <div className="theme-grid">
            {availableThemes.map((theme) => {
              const selected = theme.id === settings.themeId

              return (
                <button
                  className="theme-card"
                  data-selected={selected}
                  type="button"
                  key={theme.id}
                  onClick={() => onThemeChange(theme.id)}
                >
                  <span
                    className="theme-card__preview"
                    style={{ background: theme.tokens.background.base }}
                    aria-hidden="true"
                  >
                    <span style={{ background: theme.tokens.accent.primary }} />
                    <span style={{ background: theme.tokens.radio.transmitting }} />
                  </span>
                  <span className="theme-card__copy">
                    <strong>{theme.name}</strong>
                    <small>{theme.description}</small>
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="settings-section settings-section--row">
          <div>
            <strong>Reduced motion</strong>
            <p>Keep transitions calm and disable ambient loops.</p>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={settings.reducedMotion}
              onChange={(event) => onReducedMotionChange(event.target.checked)}
            />
            <span aria-hidden="true" />
          </label>
        </div>

        <footer className="settings-panel__footer">Chirp 0.1 · Phase 1</footer>
      </section>
    </div>
  )
}
