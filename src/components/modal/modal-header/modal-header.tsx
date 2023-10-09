import * as React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Stack } from '@mui/material';

type Props = {
  onClose: () => void;
};

export default function ModalTitle({ onClose }: Props) {
  return (
    <Stack
      sx={{
        pt: { xs: 3, md: 6 },
        pb: { xs: 2, md: 3 },
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
      }}
    >
      <IconButton
        aria-label="close"
        sx={{ backgroundColor: 'action.hover' }}
        onClick={() => onClose()}
      >
        <CloseIcon />
      </IconButton>
    </Stack>
  );
}
