import * as React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Stack } from '@mui/material';

type Props = {
  onClose: () => void;
  children?: React.ReactNode;
};

export default function ModalTitle({ onClose, children }: Props) {
  return (
    <Stack
      sx={{
        pt: { xs: 3, md: 6 },
        pb: { xs: 2, md: 3 },
        flexDirection: 'row',
        justifyContent: children ? 'space-between' : 'flex-end',
        width: '100%',
      }}
    >
      {children}
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
