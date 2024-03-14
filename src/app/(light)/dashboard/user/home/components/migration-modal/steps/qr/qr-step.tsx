import QRCode from 'react-qr-code';

import { Box } from '@mui/material';

import LoadingQRCode from './loading-qr-code';

type Props = {
  sessionId: string | undefined;
  onClose: () => void;
};

export function QrStep({ sessionId }: Props) {
  return (
    <Box p={2}>
      {sessionId ? (
        <QRCode
          size={256}
          style={{
            height: 'auto',
            maxWidth: '100%',
            width: '100%',
          }}
          value={sessionId}
          viewBox={`0 0 256 256`}
        />
      ) : (
        <LoadingQRCode />
      )}
    </Box>
  );
}
