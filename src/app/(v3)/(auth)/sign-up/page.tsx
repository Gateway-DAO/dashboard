import Link from 'next/link';

import GTWLogo from '@/components/gtw-logo/gtw-logo';
import routes from '@/constants/routes';
import { newAuth } from '@/locale/en/auth';
import QRCode from 'react-qr-code';

import { Box, Stack, Typography, Link as MuiLink } from '@mui/material';

import AuthContentBox from '../components/auth-content-box';

export default function SignUpPage() {
  return (
    <>
      <AuthContentBox>
        <Stack direction="row" gap={1} alignItems="center" mb={10}>
          <GTWLogo isHeader={false} />
        </Stack>
        <Typography variant="h2" component="h1" mb={2}>
          {newAuth.signUp.title}
        </Typography>
        <Typography mb={5}>{newAuth.signUp.description}</Typography>
        <Box p={2} display="inline-block">
          <QRCode value="https://gateway.io/auth/login" size={380 - 38} />
        </Box>
      </AuthContentBox>
      <AuthContentBox component={Typography}>
        Already have a Gateway ID?{' '}
        <MuiLink component={Link} href={routes.login}>
          Login
        </MuiLink>
      </AuthContentBox>
    </>
  );
}
