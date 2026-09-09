import { motion } from 'motion/react'
import { Icon } from '@/components/ui/Icon'

interface AppFooterProps {
  onOpenSettings: () => void
}

export function AppFooter({ onOpenSettings }: AppFooterProps) {
  return (
    <footer className="app-footer">
      <div className="app-footer__device" title="Microphone input">
        <span className="app-footer__device-status" aria-hidden="true" />
        <span className="app-footer__device-icon" aria-hidden="true">
          <Icon name="mic" size={14} />
        </span>
        <span>Default mic</span>
      </div>

      <motion.button
        className="icon-button icon-button--surface"
        type="button"
        aria-label="Open settings"
        title="Settings"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        onClick={onOpenSettings}
      >
        <Icon name="settings" size={16} />
      </motion.button>
    </footer>
  )
}
