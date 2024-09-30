import { Suspense, useState } from 'react';

import SimpleCopyButton from '@/components/simple-copy-button/simple-copy-button';
import EvmProvider from '@/services/wallets/evm-provider/evm-provider';
import SolanaProvider from '@/services/wallets/solana-provider';
import SuiProvider from '@/services/wallets/sui-provider';
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
            alignItems: { xs: 'normal', lg: 'flex-start' },
            justifyContent: { xs: 'normal', lg: 'space-between' },
            gap: 2,
            flexDirection: { xs: 'column', lg: 'row' },
          }}
        >
          <Paper
            variant="outlined"
            sx={{
              py: 3,
              px: 3,
              width: '100%',
            }}
          >
            <Stack
              flexDirection="column"
              justifyContent={{ xs: 'none', lg: 'space-between' }}
              gap={{
                xs: 6,
                lg: 10,
              }}
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
                  width: '100%',
                  '> div': { width: '100%' },
                }}
              >
                <Suspense fallback={null}>
                  <EvmProvider>
                    <SolanaProvider>
                      <SuiProvider>
                        <SignButtons
                          message={message}
                          onSign={onSign}
                          onError={onError}
                        />
                      </SuiProvider>
                    </SolanaProvider>
                  </EvmProvider>
                </Suspense>
              </Stack>
            </Stack>
          </Paper>
          <Paper
            variant="outlined"
            sx={{
              py: 3,
              px: 2,
              width: '100%',
            }}
          >
            <Stack
              direction="column"
              divider={<Divider sx={{ my: 2, mx: -2 }} />}
            >
              <Stack gap={2}>
                <Typography variant="caption">Network</Typography>
                <Typography variant="body1">{output.type ?? '-'}</Typography>
              </Stack>

              <Stack gap={2}>
                <Typography variant="caption">Signature</Typography>
                <Stack direction="row" justifyContent="space-between">
                  <Typography
                    variant="body1"
                    textOverflow="ellipsis"
                    overflow="hidden"
                  >
                    {output.signature === ''
                      ? '-'
                      : limitChars(output.signature, 42)}
                  </Typography>
                  <SimpleCopyButton text={output.signature} />
                </Stack>
              </Stack>
              <Stack gap={2}>
                <Typography variant="caption">Address</Typography>
                <Stack direction="row" justifyContent="space-between">
                  <Typography
                    variant="body1"
                    textOverflow="ellipsis"
                    overflow="hidden"
                  >
                    {output.address === ''
                      ? '-'
                      : limitChars(output.address, 42)}
                  </Typography>
                  <SimpleCopyButton
                    text={output.address}
                    sx={{ flexShrink: 0 }}
                  />
                </Stack>
              </Stack>
              {output.error && (
                <Stack gap={2}>
                  <Typography variant="caption">Error</Typography>
                  <Typography variant="body1">{output.error}</Typography>
                </Stack>
              )}
            </Stack>
          </Paper>
        </Stack>
      </Box>
    </>
  );
}
