import Image from 'next/image';
import Link from 'next/link';

import externalLinks from '@/constants/externalLinks';
import { newAuth } from '@/locale/en/auth';

import { Box, Stack, Typography } from '@mui/material';

export default function MobileDownloadApp() {
  return (
    <Box
      display={{
        xs: 'block',
        md: 'none',
      }}
    >
      <Typography variant="h4" component="h1" mb={2}>
        {newAuth.download.title}
      </Typography>
      <Typography mb={5}>{newAuth.download.description}</Typography>

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
  );
}
