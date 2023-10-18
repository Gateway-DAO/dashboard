'use client';

import { useState } from 'react';

import { common } from '@/locale/en/common';
import { sandboxAlert } from '@/locale/en/pda';

import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { Button, Typography, AlertTitle, Stack } from '@mui/material';

// TODO: avoid using hardcoded values for the colors and margins
export default function SandboxAlert() {
  const [showAlert, setShowAlert] = useState(true);

  return (
    showAlert && (
      <Stack
        sx={{
          width: '100%',
          mb: 3,
          color: '#663C00',
          padding: 2,
          backgroundColor: '#FFF4E5',
          borderRadius: '12px',
        }}
        direction="row"
        alignItems="center"
      >
        <WarningAmberIcon sx={{ marginRight: 2, color: '#F9C235' }} />
        <Stack flex={1}>
          <AlertTitle>
            <Typography fontWeight="bold">{sandboxAlert.title}</Typography>
          </AlertTitle>
          {sandboxAlert.description}
        </Stack>
        <Button
          color="inherit"
          size="small"
          onClick={() => setShowAlert(false)}
        >
          {common.actions.close}
        </Button>
      </Stack>
    )
  );
}
