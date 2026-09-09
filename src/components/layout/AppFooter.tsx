import { Icon } from '@/components/ui/Icon'

interface AppFooterProps {
  onOpenSettings: () => void
}

export function AppFooter({ onOpenSettings }: AppFooterProps) {
  return (
    <footer className="app-footer">
      <div className="app-footer__device" title="Microphone input">
        <Icon name="mic" size={13} />
        <span>Default mic</span>
      </div>

      <button
        className="icon-button"
        type="button"
        aria-label="Open settings"
        title="Settings"
        onClick={onOpenSettings}
      >
        <Icon name="settings" size={16} />
      </button>
    </footer>
  )
}
