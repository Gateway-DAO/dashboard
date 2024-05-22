'use client';

import Link from 'next/link';

import GTWLogo from '@/components/gtw-logo/gtw-logo';
import ScanIcon from '@/components/icons/scan';
import routes from '@/constants/routes';
import { newAuth } from '@/locale/en/auth';
import QRCode from 'react-qr-code';

import { Box, Stack, Typography, Link as MuiLink } from '@mui/material';

import AuthContentBox from '../components/auth-content-box';

export default function LoginPage() {
  return (
    <>
      <AuthContentBox>
        <Stack direction="row" gap={1} alignItems="center" mb={10}>
          <GTWLogo isHeader={false} />
        </Stack>
        <Typography variant="h2" component="h1" mb={2}>
          {newAuth.login.title}
        </Typography>
        <Typography mb={5}>
          {newAuth.login.description} <ScanIcon sx={{ verticalAlign: 'sub' }} />
        </Typography>
        <Box p={2} display="inline-block">
          <QRCode value="https://gateway.io/auth/login" size={380 - 38} />
        </Box>
      </AuthContentBox>
      <AuthContentBox component={Typography}>
        Don't have a Gateway ID?{' '}
        <MuiLink component={Link} href={routes.signUp}>
          Sign up
        </MuiLink>
      </AuthContentBox>
    </>
  );
}
