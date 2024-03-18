import Image from 'next/image';
import Link from 'next/link';

import ModalTitle from '@/components/modal/modal-header/modal-header';
import externalLinks from '@/constants/externalLinks';
import { useToggle } from '@react-hookz/web';
import QRCode from 'react-qr-code';

import { ArrowBackIosOutlined, QrCodeOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import LoadingQRCode from './loading-qr-code';

type Props = {
  sessionId: string | undefined;
  onBack: () => void;
  onClose: () => void;
};

export default function QrStep({ sessionId, onBack, onClose }: Props) {
  const [downloadModal, toggleDownloadModal] = useToggle(false);

  return (
    <>
      <ModalTitle onClose={onClose}>
        <IconButton
          aria-label="close"
          sx={{ backgroundColor: 'action.hover' }}
          onClick={onBack}
        >
          <ArrowBackIosOutlined />
        </IconButton>
      </ModalTitle>
      <Box
        mt={2}
        p={2}
        width={232}
        bgcolor="grey.50"
        borderRadius={1}
        border={1}
        borderColor="divider"
      >
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
      <Typography mt={5} variant="h4">
        Migrate your data
      </Typography>
      <Typography mt={1}>
        On your mobile device, open the Gateway Wallet app and then scan the QR
        code.
      </Typography>
      <Divider sx={{ mx: { xs: -3, md: -6 }, my: 5 }} />
      <Typography>
        <b>Don't have the app?</b>
        <br />
        Download the Gateway Wallet from an app store and create your ID.
      </Typography>
      <Stack direction="row" gap={1} mt={3}>
        <Link
          href={externalLinks.gateway_wallet_ios}
          style={{
            display: 'inherit',
          }}
        >
          <Image
            width={162.12}
            height={59}
            src="/images/app-store.svg"
            alt="App Store"
          />
        </Link>
        <Link
          href={externalLinks.gateway_wallet_android}
          style={{
            display: 'inherit',
          }}
        >
          <Image
            width={158.3}
            height={59}
            src="/images/play-store.svg"
            alt="App Store"
          />
        </Link>
        <Button
          variant="outlined"
          startIcon={<QrCodeOutlined />}
          color="inherit"
          sx={{
            borderRadius: 0.5,
            lineHeight: 1.25,
            '.MuiButton-startIcon > svg': {
              fontSize: 32,
            },
            py: 0,
            height: '100%',
            borderColor: 'divider',
          }}
          onClick={toggleDownloadModal}
        >
          Show QR code to download the app
        </Button>
      </Stack>
      <Button
        onClick={onClose}
        fullWidth
        variant="outlined"
        sx={{
          mt: 5,
        }}
      >
        Close
      </Button>
      <Dialog open={downloadModal} onClose={() => toggleDownloadModal()}>
        <DialogTitle>Scan QR code to downlad</DialogTitle>
        <DialogContent>
          <Box
            mt={2}
            p={2}
            height={296}
            bgcolor="grey.50"
            borderRadius={1}
            border={1}
            borderColor="divider"
          >
            <QRCode
              size={256}
              value={`${window.location.origin}/api/wallet-download`}
              viewBox={`0 0 256 256`}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => toggleDownloadModal()}
            fullWidth
            variant="outlined"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
