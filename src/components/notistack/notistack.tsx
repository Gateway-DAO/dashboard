'use client';

import React, { ReactNode } from 'react';

import {
  MaterialDesignContent,
  SnackbarProvider,
  closeSnackbar,
} from 'notistack';

import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material';

type Props = {
  children: ReactNode;
};

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  borderRadius: 2,
  '&.notistack-MuiContent-default': {
    backgroundColor: '#323232',
  },
  '&.notistack-MuiContent-error': {
    backgroundColor: '#970C0C',
  },
}));

const Notistack = ({ children }: Props) => {
  const notistackRef = React.useRef<SnackbarProvider>();

  return (
    <SnackbarProvider
      ref={notistackRef as any}
      variant="default"
      maxSnack={6}
      preventDuplicate={true}
      Components={{
        default: StyledMaterialDesignContent,
        success: StyledMaterialDesignContent,
        error: StyledMaterialDesignContent,
        info: StyledMaterialDesignContent,
        warning: StyledMaterialDesignContent,
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      autoHideDuration={8000}
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
