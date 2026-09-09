import { AnimatePresence, motion } from 'motion/react'
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
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="settings-layer"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onMouseDown={onClose}
        >
          <motion.section
            className="settings-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="settings-title"
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.985 }}
            transition={{ type: 'spring', stiffness: 340, damping: 32 }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header className="settings-panel__header">
              <div>
                <p className="settings-panel__eyebrow">CHIRP</p>
                <h2 id="settings-title">Make it yours.</h2>
              </div>
              <motion.button
                className="icon-button icon-button--surface"
                type="button"
                aria-label="Close settings"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={onClose}
              >
                <Icon name="close" size={15} />
              </motion.button>
            </header>

            <div className="settings-section">
              <div className="settings-section__heading">
                <span>Appearance</span>
                <span className="settings-section__meta">live preview</span>
              </div>

              <div className="theme-grid">
                {availableThemes.map((theme) => {
                  const selected = theme.id === settings.themeId

                  return (
                    <motion.button
                      className="theme-card"
                      data-selected={selected}
                      type="button"
                      key={theme.id}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.985 }}
                      transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                      onClick={() => onThemeChange(theme.id)}
                    >
                      <span
                        className="theme-card__preview"
                        style={{ background: theme.tokens.background.base }}
                        aria-hidden="true"
                      >
                        <span style={{ background: theme.tokens.accent.primary }} />
                        <span style={{ background: theme.tokens.radio.transmitting }} />
                        <i style={{ borderColor: theme.tokens.text.primary }} />
                      </span>
                      <span className="theme-card__copy">
                        <strong>{theme.name}</strong>
                        <small>{theme.description}</small>
                      </span>
                    </motion.button>
                  )
                })}
              </div>
            </div>

            <div className="settings-section settings-section--row">
              <div>
                <strong>Reduced motion</strong>
                <p>Keep the same design with calmer transitions.</p>
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

            <footer className="settings-panel__footer">Chirp 0.1 · interaction pass</footer>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
