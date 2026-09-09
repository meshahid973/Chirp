import { getCurrentWindow } from '@tauri-apps/api/window'

function isTauriRuntime() {
  return typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window
}

async function run(action: (window: ReturnType<typeof getCurrentWindow>) => Promise<void>) {
  if (!isTauriRuntime()) return
  await action(getCurrentWindow())
}

export const nativeWindow = {
  minimize: () => run((window) => window.minimize()),
  toggleMaximize: () => run((window) => window.toggleMaximize()),
  hide: () => run((window) => window.hide()),
}
