import { Suspense, useState } from 'react';

import SimpleCopyButton from '@/components/simple-copy-button/simple-copy-button';
import EvmProvider from '@/services/wallets/evm-provider/evm-provider';
import SolanaProvider from '@/services/wallets/solana-provider';
import WalletConnectionProvider from '@/services/wallets/wallet-connection-provider';
import { Network } from '@/types/web3';
import { limitChars } from '@/utils/string';

import {
  Container,
  Stack,
  Divider,
  Paper,
  TextField,
  Typography,
  Box,
} from '@mui/material';

import SignButtons from './sign-buttons';

export default function MessageBox() {
  const [message, setMessage] = useState('');
  const [output, setOutput] = useState<{
    address: string;
    signature: string;
    error: string;
    type?: Network;
  }>({
    address: '',
    signature: '',
    error: '',
  });

  const onSign = (address: string, signature: string, network: Network) => {
    setOutput({
      signature,
      address,
      error: '',
      type: network,
    });
  };

  const onError = (error: string, network: Network) => {
    setOutput({
      signature: '',
      error,
      address: '',
      type: network,
    });
  };

  return (
    <>
      <Box
        sx={{
          pb: 6,
          bgcolor: 'primary.100',
        }}
      >
        <Stack
          component={Container}
          sx={{
            direction: { xs: 'column', lg: 'row' },
            justifyContent: { xs: 'normal', lg: 'space-between' },
            gap: 2,
            flexDirection: { xs: 'column', lg: 'row' },
          }}
        >
          <Paper
            variant="outlined"
            sx={{
              py: 3,
              px: 2,
              width: { lg: '100%' },
              marginTop: 2,
              mr: 1,
            }}
          >
            <Stack
              flexDirection="column"
              justifyContent={{ xs: 'none', lg: 'space-between' }}
            >
              <TextField
                label="Message"
                multiline
                variant="outlined"
                size="medium"
                minRows={4}
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
              <Stack
                flexDirection={{ xs: 'column', lg: 'row' }}
                sx={{
                  mt: { xs: 3, lg: 9 },
                  width: '100%',
                  '> div': { width: '100%' },
                }}
              >
                <Suspense fallback={null}>
                  <EvmProvider>
                    <SolanaProvider>
                      <SignButtons
                        message={message}
                        onSign={onSign}
                        onError={onError}
                      />
                    </SolanaProvider>
                  </EvmProvider>
                </Suspense>
              </Stack>
            </Stack>
          </Paper>
          <Paper
            variant="outlined"
            sx={{
              pt: 3,
              px: 2,
              width: { lg: '100%' },
              marginTop: 2,
              mr: 1,
              height: '304px',
            }}
          >
            <Stack direction="column">
              <Stack direction={'column'} justifyContent={'space-between'}>
                <Typography variant="caption" sx={{ mb: 1 }}>
                  Network
                </Typography>
                <Typography variant="body1">
                  {!output.type ? '-' : output.type}
                </Typography>
                <Divider sx={{ mt: 1, mb: 2 }} />
              </Stack>

              <Stack direction={'column'} justifyContent={'space-between'}>
                <Typography variant="caption" sx={{ mb: 1 }}>
                  Signature
                </Typography>
                <Stack direction={'row'}>
                  <Typography variant="body1" flex={1}>
                    {output.signature === ''
                      ? '-'
                      : limitChars(output.signature, 61)}
                  </Typography>

                  <SimpleCopyButton text={output.signature} />
                </Stack>
                <Divider sx={{ mt: 1, mb: 2 }} />
              </Stack>

              <Stack direction={'column'} justifyContent={'space-between'}>
                <Typography variant="caption" sx={{ mb: 1 }}>
                  Address
                </Typography>
                <Stack direction={'row'}>
                  <Typography variant="body1" flex={1}>
                    {output.address === '' ? '-' : output.address}
                  </Typography>
                  <SimpleCopyButton text={output.address} />
                </Stack>
                <Divider sx={{ mt: 1, mb: 2 }} />
              </Stack>
              {output.error && (
                <Typography variant="caption" sx={{ mb: 1 }}>
                  Error:- {output.error}
                </Typography>
              )}
            </Stack>
          </Paper>
        </Stack>
      </Box>
    </>
  );
}
