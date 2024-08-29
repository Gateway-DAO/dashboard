import { useState } from 'react';

import {
  Container,
  Stack,
  Divider,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
} from '@mui/material';

import bs58 from 'bs58';
import { FaEthereum } from 'react-icons/fa';
import SolanaIcon from '@/components/icons/solana';
import { ethers } from 'ethers';

import SimpleCopyButton from '@/components/simple-copy-button/simple-copy-button';
import { limitChars } from '@/utils/string';

export default function MessageBox() {
  const [message, setMessage] = useState('');
  const [output, setOutput] = useState({
    address: '',
    signature: '',
    error: '',
    type: '',
  });

  const handleEvmSign = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      try {
        const address = await signer.getAddress();

        const signature = await signer.signMessage(message);
        setOutput({ signature, address, error: '', type: 'Etherum' });
      } catch (error) {
        setOutput({
          signature: '',
          error: 'Error signing message with EVM wallet.',
          address: '',
          type: 'Etherum',
        });
      }
    } else {
      setOutput({
        signature: '',
        error: 'MetaMask is not installed.',
        address: '',
        type: 'Etherum',
      });
    }
  };

  const handleSolanaSign = async () => {
    const provider = window.solana;

    if (provider) {
      try {
        await provider.connect();
        const encodedMessage = new TextEncoder().encode(message);
        const signedMessage = await provider.signMessage(
          encodedMessage,
          'utf8'
        );
        const signature = bs58.encode(signedMessage.signature);
        setOutput({
          signature,
          address: provider.publicKey.toString(),
          error: '',
          type: 'Solana',
        });
      } catch (error) {
        setOutput({
          signature: '',
          error: 'Error signing message with Solana wallet.',
          address: '',
          type: 'Solana',
        });
      }
    } else {
      setOutput({
        signature: '',
        error: 'Phantom wallet is not installed.',
        address: '',
        type: 'Solana',
      });
    }
  };

  return (
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
            pt: 3,
            px: 2,
            width: { lg: '100%' },
            marginTop: 2,
            mr: 1,
            height: '304px',
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
              sx={{ mt: { xs: 3, lg: 9 } }}
            >
              <Button
                variant="outlined"
                color="primary"
                size="large"
                startIcon={<FaEthereum />}
                onClick={() => handleEvmSign()}
                sx={{ mr: 1, width: { lg: '50%' } }}
              >
                Sign with Etherum Wallet
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                onClick={() => handleSolanaSign()}
                startIcon={<SolanaIcon />}
                sx={{ mt: { xs: 1, lg: 0 }, width: { lg: '50%' } }}
              >
                Sign with Solana Wallet
              </Button>
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
                {output.type === '' ? '-' : output.type}
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
  );
}
