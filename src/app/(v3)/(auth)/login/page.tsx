'use client';

import Link from 'next/link';

import GTWLogo from '@/components/gtw-logo/gtw-logo';
import ScanIcon from '@/components/icons/scan';
import routes from '@/constants/routes';
import { newAuth } from '@/locale/en/auth';
import stringReplace from 'react-string-replace';

import { Box, Stack, Typography, Link as MuiLink } from '@mui/material';

import AuthContentBox from '../components/auth-content-box';
import MobileDownloadApp from '../components/mobile-download';
import LoginQrCode from './login-qr-code';

export default function LoginPage() {
  return (
    <>
      <AuthContentBox>
        <Stack direction="row" gap={1} alignItems="center" mb={10}>
          <GTWLogo isHeader={false} />
        </Stack>
        <Box
          display={{
            xs: 'none',
            md: 'block',
          }}
        >
          <Typography variant="h2" component="h1" mb={2}>
            {newAuth.login.title}
          </Typography>
          <Typography mb={5}>
            {stringReplace(newAuth.login.description, /(\$\d)/g, (match) => (
              <ScanIcon sx={{ verticalAlign: 'sub' }} key={match} />
            ))}
          </Typography>
          <Box
            p={2}
            border="1px solid"
            borderColor="divider"
            display="inline-block"
            borderRadius={1.5}
            width={380}
          >
            <LoginQrCode />
          </Box>
        </Box>
        <MobileDownloadApp />
      </AuthContentBox>
      <Box
        display={{
          xs: 'none',
          md: 'block',
        }}
      >
        <AuthContentBox component={Typography}>
          Don't have a Gateway ID?{' '}
          <MuiLink component={Link} href={routes.signUp}>
            Sign up
          </MuiLink>
        </AuthContentBox>
      </Box>
    </>
  );
}
