'use client';
import { useSession } from 'next-auth/react';

import CopyButton from '@/components/copy-button/copy-button';
import ToggleVisibilityButton from '@/components/toggle-visibility-button/toggle-visibility-button';
import { useToggle } from '@react-hookz/web';

import { Card, CardContent, CardHeader, Typography } from '@mui/material';

export default function DID({ did }: { did: string }) {
  const [isVisible, toggleVisible] = useToggle(false);

  return (
    <Card sx={{ width: '100%' }} variant="outlined">
      <CardHeader
        title="Account DID"
        titleTypographyProps={{
          variant: 'subtitle1',
          fontWeight: 'bold',
        }}
        action={
          <>
            <ToggleVisibilityButton
              isVisible={isVisible}
              onToggle={toggleVisible}
              size="medium"
              sx={{ mr: 1 }}
            />
            <CopyButton text={did} size="medium" />
          </>
        }
      />
      <CardContent>
        <Typography sx={{ mb: 2, wordBreak: 'break-all' }}>
          {isVisible ? did : '••••'}
        </Typography>
      </CardContent>
    </Card>
  );
}
