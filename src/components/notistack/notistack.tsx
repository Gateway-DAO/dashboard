'use client';

import React, { ReactNode } from 'react';

import { SnackbarProvider, closeSnackbar } from 'notistack';

import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material';

type Props = {
  children: ReactNode;
};

const Notistack = ({ children }: Props) => {
  const theme = useTheme();
  const notistackRef = React.useRef<SnackbarProvider>();

  return (
    <SnackbarProvider
      ref={notistackRef as any}
      variant="default"
      maxSnack={6}
      preventDuplicate={true}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      autoHideDuration={4000}
      style={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        position: 'relative',
      }}
      action={(snackbarId) => (
        <CloseIcon
          sx={{ cursor: 'pointer', width: 16, mr: 1 }}
          onClick={() => closeSnackbar(snackbarId)}
        />
      )}
    >
      {children}
    </SnackbarProvider>
  );
};

export default Notistack;
