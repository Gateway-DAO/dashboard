import Image from 'next/image';
import { redirect } from 'next/navigation';

import Logo from '@/components/logo/logo';
import routes from '@/constants/routes';
import EvmProvider from '@/services/wallets/evm-provider/evm-provider';
import SolanaProvider from '@/services/wallets/solana-provider';
import { PageWithSearchParams } from '@/types/next';

import { Box, Card, Stack } from '@mui/material';

import UsernameForm from './components/username-form';

export default function NewUserPage({
  searchParams,
}: PageWithSearchParams<{
  message: string;
  signature: string;
}>) {
  if (!searchParams?.message || !searchParams?.signature) {
    redirect(routes.home);
  }

  return (
    <>
      <Image
        src="/signup.jpg"
        alt="Room full of computers, monitors and servers"
        fill
        quality={100}
        sizes="(max-width: 768px) 1000px, 100vw"
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
          zIndex: -1,
        }}
      />
      <Box
        sx={{
          py: 6,
          px: {
            xs: 3,
            md: 5,
            lg: 6,
          },
          height: '100%',
        }}
      >
        <Card
          component={Stack}
          elevation={0}
          gap={9.75}
          sx={{
            p: 3,
            maxWidth: 610,
            bgcolor: 'white.main',
            height: '100%',
            overflowY: 'auto',
          }}
        >
          <Logo href={routes.home} />

          <EvmProvider>
            <SolanaProvider>
              <UsernameForm
                message={searchParams.message}
                signature={searchParams.signature}
              />
            </SolanaProvider>
          </EvmProvider>
        </Card>
      </Box>
    </>
  );
}
