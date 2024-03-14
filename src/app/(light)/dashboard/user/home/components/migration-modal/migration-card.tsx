'use client';
import Link from 'next/link';
import { useState } from 'react';

import DataMigrationIcon from '@/components/icons/data-migration';

import { Box, Button, Paper, Stack, Typography } from '@mui/material';

import MigrationModal from './migration-modal';
import { MigrationStep } from './types';

export default function MigrationCard() {
  const [step, setStep] = useState<MigrationStep>('closed');

  const onOpen = () => {
    if (step !== 'closed') return;
    setStep('start');
  };

  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          padding: 2,
          width: '100%',
          textDecoration: 'none',
          '&:last-child': { mr: 0 },
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <DataMigrationIcon
          sx={{
            width: 73,
            height: 40,
            mb: 11,
          }}
        />

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Data migration
          </Typography>
          <Typography mt={1} variant="h5" gutterBottom whiteSpace="pre">
            Migrate your data{'\n'}from Protocol V2 to V3
          </Typography>
          <Typography
            variant="body2"
            width={300}
            gutterBottom
            sx={{ flexGrow: 1 }}
          >
            If you have a Gateway ID with PDAs issued on the Protocol v2, you
            can migrate them to the new Gateway Protocol.
          </Typography>
        </Box>
        <Stack direction="row" gap={1}>
          <Button
            component={Link}
            href="#"
            variant="outlined"
            size="small"
            sx={{ alignSelf: 'flex-start', mt: 'auto' }}
          >
            Learn More
          </Button>
          <Button
            component="span"
            variant="contained"
            size="small"
            sx={{ alignSelf: 'flex-start', mt: 'auto' }}
            onClick={onOpen}
          >
            Migrate Now
          </Button>
        </Stack>
      </Paper>
      <MigrationModal step={step} setStep={setStep} />
    </>
  );
}
