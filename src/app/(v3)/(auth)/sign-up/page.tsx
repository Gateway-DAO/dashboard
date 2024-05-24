import Image from 'next/image';
import Link from 'next/link';

import GTWLogo from '@/components/gtw-logo/gtw-logo';
import externalLinks from '@/constants/externalLinks';
import routes from '@/constants/routes';
import { newAuth } from '@/locale/en/auth';

import { Box, Stack, Typography, Link as MuiLink } from '@mui/material';

import AuthContentBox from '../components/auth-content-box';
import MobileDownloadApp from '../components/mobile-download';
import SignUpQrCode from './sign-up-qr-code';

export default function SignUpPage() {
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
            {newAuth.signUp.title}
          </Typography>
          <Typography mb={5}>{newAuth.signUp.description}</Typography>
          <Box
            p={2}
            border="1px solid"
            borderColor="divider"
            display="inline-block"
            borderRadius={1.5}
            mb={2}
          >
            <SignUpQrCode />
          </Box>
          <Stack direction="row" gap={2}>
            <Link
              href={externalLinks.gateway_wallet_ios}
              style={{
                display: 'inherit',
              }}
            >
              <Image
                width={162.12}
                height={59}
                src="/images/app-store.svg"
                alt="App Store"
              />
            </Link>
            <Link
              href={externalLinks.gateway_wallet_android}
              style={{
                display: 'inherit',
              }}
            >
              <Image
                width={158.3}
                height={59}
                src="/images/play-store.svg"
                alt="App Store"
              />
            </Link>
          </Stack>
        </Box>
        <MobileDownloadApp />
      </AuthContentBox>
      <Box
        sx={{
          display: {
            xs: 'none',
            md: 'block',
          },
        }}
      >
        <AuthContentBox component={Typography}>
          Already have a Gateway ID?{' '}
          <MuiLink component={Link} href={routes.login}>
            Login
          </MuiLink>
        </AuthContentBox>
      </Box>
    </>
  );
}
