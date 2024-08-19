'use client';

import { useState } from 'react';

import { Button, Typography, AlertTitle, Alert } from '@mui/material';

export default function SandboxAlert() {
  const storageKey = 'testnet-disclaimer';
  const hasSeenTestnetDisclaimer: string | null =
    localStorage.getItem(storageKey) || null;
  const [showAlert, toggleAlert] = useState(
    () => !hasSeenTestnetDisclaimer || hasSeenTestnetDisclaimer !== 'closed'
  );

  return (
    showAlert && (
      <Alert
        sx={{
          borderRadius: '16px',
          mb: 4,
          mt: 4,
          alignItems: 'center',
        }}
        severity="warning"
        action={
          <Button
            color="inherit"
            size="small"
            onClick={() => {
              localStorage.setItem(storageKey, 'closed');
              toggleAlert(false);
            }}
          >
            Close
          </Button>
        }
      >
        <AlertTitle>You are on the Gateway Sandbox</AlertTitle>
        <Typography variant="body2">
          The data is temporary and will be gone in 60 days.
        </Typography>
      </Alert>
    )
  );
}
