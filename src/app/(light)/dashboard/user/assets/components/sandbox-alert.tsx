'use client';

import { useState } from 'react';

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
            Close
          </Button>
        }
      >
        <AlertTitle>
          <Typography fontWeight="bold">
            You are on the Gateway Sandbox
          </Typography>
        </AlertTitle>
        The data is temporary and will gone in 60 days.
      </Alert>
    )
  );
}
