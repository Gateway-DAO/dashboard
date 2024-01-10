'use client';

import { common } from '@/locale/en/common';

import CancelIcon from '@mui/icons-material/Cancel';
import { Button } from '@mui/material';

type Props = {
  proof: any; // TODO: Add type
};

export default function ProofRevokeButton({}: Props) {
  return (
    <Button
      variant="outlined"
      size="large"
      color="error"
      sx={{
        mb: 2,
        width: '100%',
        fontWeight: 700,
        fontSize: 13,
      }}
      onClick={() => console.log('test')} // TODO: Add action
      startIcon={<CancelIcon height={20} width={20} color="error" />}
    >
      {common.actions.revoke_access}
    </Button>
  );
}
