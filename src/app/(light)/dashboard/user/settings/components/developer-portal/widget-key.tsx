import CopyButton from '@/components/copy-button/copy-button';
import { settings } from '@/locale/en/settings';

import { Card, CardContent, CardHeader, Typography } from '@mui/material';

export default function WidgetKey() {
  return (
    <Card sx={{ width: '100%' }} variant="outlined">
      <CardHeader
        titleTypographyProps={{
          variant: 'subtitle1',
          fontWeight: 'bold',
        }}
        title={settings.developer_portal.widget_key}
        action={
          <CopyButton text={process.env.NEXT_PUBLIC_API_PLAYGROUND_KEY!} />
        }
      />
      <CardContent>
        <Typography>{process.env.NEXT_PUBLIC_API_PLAYGROUND_KEY!}</Typography>
      </CardContent>
    </Card>
  );
}
