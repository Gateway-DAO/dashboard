'use client';
import { protocol } from '@/locale/en/protocol';

import { Button } from '@mui/material';

export default function ShareButton() {
  return (
    <Button
      variant="contained"
      size="large"
      sx={{
        mb: 2,
        width: '100%',
        fontWeight: 700,
        fontSize: 13,
      }}
      onClick={() => console.log()}
    >
      {protocol.pda.share_a_copy}
    </Button>
  );
}
