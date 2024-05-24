'use client';
import { QRCodeProps } from 'react-qr-code';

import { Box, CircularProgress } from '@mui/material';

import GtwQRCode from './gtw-qr-code';

export default function LoadingQRCode({ size }: Pick<QRCodeProps, 'size'>) {
  return (
    <Box position="relative">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            backgroundColor: 'white',
            p: 1,
            borderRadius: '100%',
            width: 64,
            height: 64,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      </Box>
      <Box
        sx={{
          opacity: 0.5,
        }}
      >
        <GtwQRCode size={size} value={''} />
      </Box>
    </Box>
  );
}
