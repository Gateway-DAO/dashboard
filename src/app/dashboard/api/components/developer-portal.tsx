'use client';

import { useToggle } from '@react-hookz/web';

import { Stack } from '@mui/material';

import AuthenticationTokenSection from './authentication-token';

export default function DeveloperPortal() {
  return (
    <Stack spacing={3} alignItems="flex-start">
      <Stack direction="column" gap={2}>
        <AuthenticationTokenSection />
      </Stack>
    </Stack>
  );
}
