'use client';

import { Stack } from '@mui/material';

import Avatar from './display-fields/avatar';
import DisplayName from './display-fields/display-name';
import Username from './display-fields/username/username';

export default function DisplaySettings() {
  return (
    <>
      <Stack gap={3} alignItems="stretch">
        <Avatar />
        <DisplayName />
        <Username />
      </Stack>
    </>
  );
}
