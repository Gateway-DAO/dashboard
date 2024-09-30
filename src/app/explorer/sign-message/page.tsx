import { Metadata } from 'next';

import InternalHeader from '@/components/internal/internal-header';

import { Typography } from '@mui/material';

import MessageBox from './components/message-box';

export const metadata: Metadata = {
  title: `Sign Message`,
};

export default function SignMessagePage() {
  return (
    <>
      <InternalHeader
        color="primary"
        slot={
          <>
            <Typography variant="h2" sx={{ mb: 2 }}>
              Sign Message
            </Typography>
            <Typography variant="body2">
              Sign and verify message signatures using an EVM or Solana address.
            </Typography>
          </>
        }
      ></InternalHeader>
      <MessageBox />
    </>
  );
}
