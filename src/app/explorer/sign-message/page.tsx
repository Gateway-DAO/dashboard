'use client';

import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

// import Web3 from 'web3';
import bs58 from 'bs58';
import { FaEthereum } from 'react-icons/fa';
import SolanaIcon from '@/components/icons/solana';
import { useState } from 'react';
import { ethers } from 'ethers';

export default function SignMessagePage() {
  const [message, setMessage] = useState('');
  const [output, setOutput] = useState('');

  const handleEvmSign = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      try {
        const address = await signer.getAddress();

        const signature = await signer.signMessage(message);
        setOutput(`EVM Signature: ${signature}\nWallet Address: ${address}`);
      } catch (error) {
        console.error('Error signing message with EVM wallet:', error);
        setOutput('Error signing message with EVM wallet.');
      }
    } else {
      setOutput('MetaMask is not installed.');
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
        setOutput(
          `Solana Signature: ${signature}\nWallet Address: ${provider.publicKey.toString()}`
        );
      } catch (error) {
        console.error('Error signing message with Solana wallet:', error);
        setOutput('Error signing message with Solana wallet.');
      }
    } else {
      setOutput('Phantom wallet is not installed.');
    }
  };

  return (
    <>
      <Box
        sx={{
          pt: 21,
          pb: 6,
          bgcolor: 'primary.light',
        }}
      >
        <Stack
          component={Container}
          maxWidth="xl"
          justifyContent="space-between"
        >
          <Typography variant="h2">Sign Message</Typography>
          <Typography variant="body2">
            Sign and verify message signatures using an EVM or Solana address.
          </Typography>
        </Stack>
      </Box>
      <Stack
        component={Container}
        sx={{
          direction: 'row',
          justifyContent: 'space-between',
          gap: 2,
          flexDirection: 'row',
          overflow: 'auto',
          mt: 7,
        }}
      >
        <Paper
          variant="outlined"
          sx={{
            padding: 2,
            paddingLeft: 2,
            width: { lg: '100%' },
            marginTop: 2,
            mr: 1,
            textDecoration: 'none',
            '&:last-child': { mr: 0 },
          }}
        >
          <Stack
            flexDirection="column"
            justifyContent={{ xs: 'none', lg: 'space-between' }}
            alignItems="flex-start"
          >
            <TextField
              label="message"
              multiline
              variant="outlined"
              size="medium"
              maxRows={4}
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              sx={{ width: '616px', height: '104px' }}
            />
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              sx={{ mt: 7 }}
            >
              <Button
                variant="outlined"
                color="primary"
                size="large"
                startIcon={<FaEthereum />}
                onClick={() => handleEvmSign()}
                sx={{ mr: 5 }}
              >
                Sign with Etherum Wallet
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                onClick={() => handleSolanaSign()}
                startIcon={<SolanaIcon />}
                sx={{ mt: { xs: 1, lg: 0 } }}
              >
                Sign with Solana Wallet
              </Button>
            </Stack>
          </Stack>
        </Paper>
        <Paper
          variant="outlined"
          sx={{
            padding: 2,
            paddingLeft: 2,
            width: { lg: '100%' },
            marginTop: 2,
            mr: 1,
            textDecoration: 'none',
            '&:last-child': { mr: 0 },
          }}
        >
          <Stack direction="column" alignItems="flex-start" pb={1}>
            <Typography variant="subtitle1" flex={1}>
              Network
            </Typography>
            <Typography variant="body1" flex={1}>
              Network
            </Typography>
            <Divider />
            <Typography variant="subtitle1" flex={1}>
              Signature
            </Typography>
            <Typography variant="body1" flex={1}>
              Network
            </Typography>
            <Divider orientation="horizontal" />

            <Typography variant="subtitle1" flex={1}>
              Address
            </Typography>
            <Typography variant="body1" flex={1}>
              Network
            </Typography>
            <p id="output">{output}</p>
          </Stack>
        </Paper>
      </Stack>
    </>
  );
}
