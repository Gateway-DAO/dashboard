import CopyButton from '@/components/copy-button/copy-button';

import { Card, CardContent, CardHeader, Typography } from '@mui/material';

export default function DID({ did }: { did: string }) {
  return (
    <Card sx={{ width: '100%' }} variant="outlined">
      <CardHeader
        title="Account DID"
        titleTypographyProps={{
          variant: 'subtitle1',
          fontWeight: 'bold',
        }}
        action={<CopyButton text={did} size="medium" />}
      />
      <CardContent>
        <Typography sx={{ wordBreak: 'break-all' }}>{did}</Typography>
      </CardContent>
    </Card>
  );
}
