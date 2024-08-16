'use client';

import Link from 'next/link';

import externalLinks from '@/constants/externalLinks';
import { mainnet_access } from '@/locale/en/developer-access';

import { Button, Typography, AlertTitle } from '@mui/material';
import { Stack } from '@mui/system';

// TODO: avoid using hardcoded values for the colors and margins
export default function MainnetAlert() {
  return (
    <Stack
      sx={{
        width: '100%',
        mb: 3,
        color: '#53128C',
        padding: 2,
        backgroundColor: '#771AC91F',
        borderRadius: '12px',
      }}
      direction="row"
      alignItems="center"
    >
      <Stack flex={1}>
        <AlertTitle>
          <Typography fontWeight="bold">{mainnet_access.title}</Typography>
        </AlertTitle>
        {mainnet_access.description}
      </Stack>
      <Link href={externalLinks.requestMoreAPIUsage} target="_blank">
        <Button variant="contained" size="large">
          {mainnet_access.button}
        </Button>
      </Link>
    </Stack>
  );
}
