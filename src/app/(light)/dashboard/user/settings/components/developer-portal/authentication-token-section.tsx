"use client";
import CopyButton from "@/components/copy-button/copy-button";
import ToggleVisibilityButton from "@/components/toggle-visibility-button/toggle-visibility-button";
import { useGtwSession } from "@/context/gtw-session-provider";
import { settings } from "@/locale/en/settings";
import { useToggle } from "@react-hookz/web";

import { Warning } from "@mui/icons-material";
import { Alert, Card, CardContent, CardHeader, Typography } from "@mui/material";

export default function AuthenticationTokenSection() {
  const { session } = useGtwSession();
  const [isVisible, toggleVisible] = useToggle(false);
  return <Card sx={{ width: "100%" }} variant="outlined">
    <CardHeader title={settings.developer_portal.auth_token} titleTypographyProps={{
      variant: "subtitle1",
      fontWeight: "bold",
    }} action={<>
      <ToggleVisibilityButton isVisible={isVisible} onToggle={toggleVisible} size="small" sx={{ mr: 1 }} />
      <CopyButton text={session.token} size="small" />
    </>} />
    <CardContent>
      <Typography sx={{ mb: 2, wordBreak: "break-all" }}>{isVisible ? session.token : "••••"}</Typography>
      <Alert color="warning" icon={<Warning />}>
        {settings.developer_portal.auth_token_warning}
      </Alert>
    </CardContent>
  </Card>;
}
