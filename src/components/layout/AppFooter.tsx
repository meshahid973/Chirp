import { Icon } from '@/components/ui/Icon'

interface AppFooterProps {
  onOpenSettings: () => void
}

export function AppFooter({ onOpenSettings }: AppFooterProps) {
  return (
    <footer className="app-footer">
      <div className="app-footer__device" title="Microphone input">
        <span className="app-footer__device-icon" aria-hidden="true">
          <Icon name="mic" size={15} />
        </span>
        <span>Default mic</span>
      </div>

      <button
        className="icon-button"
        type="button"
        aria-label="Open settings"
        title="Settings"
        onClick={onOpenSettings}
      >
        <Icon name="settings" size={17} />
      </button>
    </footer>
  )
}
