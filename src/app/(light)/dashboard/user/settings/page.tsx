import TitleLayout from "@/components/title-layout/title-layout";
import { settings } from "@/locale/en/settings";

import DisplaySettings from "./components/display-settings";

export default async function SettingsPage() {
  return (
    <>
      <TitleLayout titleId="settings-title" title={settings.title} subtitle={settings.subtitle}
      />
      <DisplaySettings />
    </>
  )
}
