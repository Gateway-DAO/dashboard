'use client';

import { useState } from 'react';

import { common } from '@/locale/en/common';
import { sandboxAlert } from '@/locale/en/pda';

import { Button, Typography, Alert, AlertTitle } from '@mui/material';

export default function SandboxAlert() {
  const [showAlert, setShowAlert] = useState(true);

  return (
    showAlert && (
      <Alert
        sx={{ width: '100%', mb: 3, backgroundColor: '#FFF4E5' }}
        severity="warning"
        action={
          <Button
            color="inherit"
            size="small"
            onClick={() => setShowAlert(false)}
          >
            {common.actions.close}
          </Button>
        }
      >
        <AlertTitle>
          <Typography fontWeight="bold">{sandboxAlert.title}</Typography>
        </AlertTitle>
        {sandboxAlert.description}
      </Alert>
    )
  );
}
