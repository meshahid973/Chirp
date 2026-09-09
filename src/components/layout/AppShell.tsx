import type { PropsWithChildren } from 'react'
import type { RadioStatus } from '@/core/radio/radio.types'
import { Titlebar } from '@/components/system/Titlebar'

interface AppShellProps extends PropsWithChildren {
  radioStatus: RadioStatus
}

export function AppShell({ children, radioStatus }: AppShellProps) {
  return (
    <div className="app-shell" data-radio-state={radioStatus}>
      <div className="app-shell__ambient" aria-hidden="true">
        <span className="app-shell__blob app-shell__blob--primary" />
        <span className="app-shell__blob app-shell__blob--secondary" />
        <span className="app-shell__grain" />
      </div>
      <Titlebar radioStatus={radioStatus} />
      <div className="app-shell__content">{children}</div>
    </div>
  )
}
