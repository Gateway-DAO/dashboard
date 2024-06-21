import { getSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import GTWLogo from '@/components/gtw-logo/gtw-logo';
import routes from '@/constants/routes';
import { newAuth } from '@/locale/en/auth';
import { common_elements } from '@/locale/en/common-elements';

import { Box, Stack, Typography, Link as MuiLink } from '@mui/material';

import AuthContentBox from '../components/auth-content-box';
import MobileDownloadApp from '../components/mobile-download';
import LoginQrCode from './login-qr-code';

export default async function LoginPage() {
  const session = await getSession();

  if (session) {
    return redirect(routes.dashboard.user.home);
  }

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
          <Typography mb={5}>{common_elements.scan_message}</Typography>
          <LoginQrCode />
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
          Don't have a Gateway ID?
          <MuiLink component={Link} href={routes.signUp}>
            Sign up
          </MuiLink>
        </AuthContentBox>
      </Box>
    </>
  );
}
