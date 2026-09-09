import { useState } from 'react'
import { MotionConfig } from 'motion/react'
import { AppFooter } from '@/components/layout/AppFooter'
import { AppShell } from '@/components/layout/AppShell'
import { RadioPanel } from '@/components/radio/RadioPanel'
import { SettingsPanel } from '@/components/settings/SettingsPanel'
import { useRadioController } from '@/core/radio/useRadioController'
import { useAppSettings } from '@/core/settings/useAppSettings'
import { usePushToTalk } from '@/hooks/usePushToTalk'

export function ChirpApp() {
  const radio = useRadioController()
  const settings = useAppSettings()
  const [settingsOpen, setSettingsOpen] = useState(false)

  usePushToTalk({
    enabled: !settingsOpen,
    onPress: radio.startTransmission,
    onRelease: radio.stopTransmission,
  })

  return (
    <MotionConfig reducedMotion={settings.settings.reducedMotion ? 'always' : 'user'}>
      <AppShell radioStatus={radio.session.status}>
        <RadioPanel
          session={radio.session}
          onPress={radio.startTransmission}
          onRelease={radio.stopTransmission}
        />

        <AppFooter onOpenSettings={() => setSettingsOpen(true)} />

        <SettingsPanel
          open={settingsOpen}
          settings={settings.settings}
          onClose={() => setSettingsOpen(false)}
          onThemeChange={settings.setTheme}
          onReducedMotionChange={settings.setReducedMotion}
        />
      </AppShell>
    </MotionConfig>
  )
}
