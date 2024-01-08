import { useEffect } from 'react';

import CopyButton from '@/components/copy-button/copy-button';
import { queries } from '@/constants/queries';
import { settings } from '@/locale/en/settings';
import { useMutation } from '@tanstack/react-query';

import { Card, CardContent, CardHeader, Typography } from '@mui/material';

export default function WidgetKey({ orgId }: { orgId: string }) {
  const widgetKeyMutation = useMutation({
    mutationKey: [queries.get_widget_key],
    mutationFn: async ({ orgId }: { orgId: string }) => {
      const response = await fetch('/api/org-widget-key/get', {
        method: 'POST',
        body: JSON.stringify({ orgId }),
      });
      const data = await response.json();
      if (!data) {
        throw new Error('Failed to get key');
      }
      return data;
    },
  });

  useEffect(() => {
    if (orgId) {
      widgetKeyMutation.mutate({ orgId });
    }
  }, [orgId]);

  return (
    <>
      {widgetKeyMutation.isSuccess && widgetKeyMutation.data && (
        <Card sx={{ width: '100%' }} variant="outlined">
          <CardHeader
            titleTypographyProps={{
              variant: 'subtitle1',
              fontWeight: 'bold',
            }}
            title={settings.developer_portal.widget_key}
            action={<CopyButton text={widgetKeyMutation.data.item.accessId} />}
          />
          <CardContent>
            <Typography>{widgetKeyMutation.data.item.accessId}</Typography>
          </CardContent>
        </Card>
      )}
    </>
  );
}
