import { Icon } from '@/components/ui/Icon'
import { nativeWindow } from '@/native/window'

export function Titlebar() {
  return (
    <header className="titlebar">
      <div
        className="titlebar__drag"
        data-tauri-drag-region
        onDoubleClick={() => void nativeWindow.toggleMaximize()}
      >
        <span className="titlebar__brand-mark" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="titlebar__brand">chirp</span>
      </div>

      <div className="titlebar__controls">
        <button className="titlebar__button" type="button" aria-label="Minimize" onClick={() => void nativeWindow.minimize()}>
          <Icon name="minimize" size={12} />
        </button>
        <button className="titlebar__button" type="button" aria-label="Maximize" onClick={() => void nativeWindow.toggleMaximize()}>
          <Icon name="maximize" size={11} />
        </button>
        <button
          className="titlebar__button titlebar__button--close"
          type="button"
          aria-label="Hide Chirp to tray"
          title="Hide to tray"
          onClick={() => void nativeWindow.hide()}
        >
          <Icon name="close" size={12} />
        </button>
      </div>
    </header>
  )
}
