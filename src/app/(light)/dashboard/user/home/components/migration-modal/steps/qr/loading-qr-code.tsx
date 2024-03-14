'use client';
import QRCode from 'react-qr-code';

import { Box, CircularProgress } from '@mui/material';

export default function LoadingQRCode() {
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
        <QRCode
          size={256}
          style={{
            height: 'auto',
            maxWidth: '100%',
            width: '100%',
          }}
          value={''}
          viewBox={`0 0 256 256`}
        />
      </Box>
    </Box>
  );
}
