import { useRouter } from 'next/navigation';

import { common } from '@/locale/en/common';

import CancelIcon from '@mui/icons-material/Cancel';
import { Button } from '@mui/material';

export function RevokePDA() {
  const router = useRouter();
  return (
    <>
      <Button
        variant="outlined"
        startIcon={<CancelIcon />}
        size="large"
        color="error"
        fullWidth
        sx={{
          mb: 2,
        }}
        onClick={() => {
          router.push('#issue-pda');
          console.log('Revoked');
        }}
      >
        {common.actions.revoke}
      </Button>
    </>
  );
}
