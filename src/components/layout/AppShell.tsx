import type { PropsWithChildren } from 'react'
import type { RadioStatus } from '@/core/radio/radio.types'
import { Titlebar } from '@/components/system/Titlebar'

interface AppShellProps extends PropsWithChildren {
  radioStatus: RadioStatus
}

export function AppShell({ children, radioStatus }: AppShellProps) {
  return (
    <div className="app-shell" data-radio-state={radioStatus}>
      <div className="app-shell__ambient" aria-hidden="true" />
      <Titlebar />
      <div className="app-shell__content">{children}</div>
    </div>
  )
}
