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
        backgroundColor: '#323232',
        color: theme.palette.common.white,
        position: 'relative',
        borderRadius: 2,
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
