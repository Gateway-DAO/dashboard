import { ReactNode } from 'react';

import { Dialog, Stack, Paper } from '@mui/material';

type Props = {
  open: boolean;
  handleClose: () => void;
  children: ReactNode;
  modalTitle: string;
  modalDescription: string;
  fullWidth?: boolean;
};

export default function Modal({
  open,
  handleClose,
  children,
  modalTitle,
  modalDescription,
  fullWidth,
}: Props) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby={modalTitle}
      aria-describedby={modalDescription}
      fullWidth={fullWidth}
      maxWidth="sm"
    >
      <Paper
        direction="column"
        elevation={5}
        component={Stack}
        sx={{
          px: { xs: 2, lg: 3 },
          py: { xs: 2, lg: 3 },
          height: '100%',
          width: { md: '100%' },
          display: 'flex',
          borderRadius: 1,
        }}
      >
        {children}
      </Paper>
    </Dialog>
  );
}
