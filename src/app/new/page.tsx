import Image from 'next/image';
import { redirect } from 'next/navigation';

import Logo from '@/components/logo/logo';
import routes from '@/constants/routes';
import EvmProvider from '@/services/wallets/evm-provider/evm-provider';
import SolanaProvider from '@/services/wallets/solana-provider';
import { PageWithSearchParams } from '@/types/next';

import { Box, Card, Container, Stack, Typography } from '@mui/material';

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
      <Container sx={{ py: 6, height: '100%' }}>
        <Card
          elevation={0}
          sx={{ p: 3, maxWidth: 610, bgcolor: 'white.main', height: '100%' }}
        >
          <Logo href={routes.home} />
          <Stack gap={5} mt={9.75}>
            <Box>
              <Typography variant="h2" mb={2}>
                Create your Gateway ID
              </Typography>
              <Typography variant="body1">
                The Gateway ID represents your identity. It consists of a
                username and a DID.
              </Typography>
            </Box>
            <EvmProvider>
              <SolanaProvider>
                <Stack gap={5}>
                  <UsernameForm />
                </Stack>
              </SolanaProvider>
            </EvmProvider>
          </Stack>
        </Card>
      </Container>
    </>
  );
}
