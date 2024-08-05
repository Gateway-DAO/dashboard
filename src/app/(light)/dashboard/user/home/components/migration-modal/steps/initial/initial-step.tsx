import GTWLink from '@/components/gtw-link';
import ModalTitle from '@/components/modal/modal-header/modal-header';

import { Box, Button, Stack, Typography } from '@mui/material';

import Countdown from './countdown';
import MigrationImage from './migration-image';

type Props = {
  onClose: () => void;
  onAccept: () => void;
};

export default function InitialStep({ onAccept, onClose }: Props) {
  return (
    <>
      <ModalTitle onClose={onClose}>
        <MigrationImage />
      </ModalTitle>
      <Stack gap={3}>
        <Typography variant="h3" component="h1">
          Migrate your old data to our new protocol
        </Typography>

        <Box>
          <Typography variant="body1">What is going on?</Typography>

          <ul>
            <Typography variant="body1" component="li">
              We did changes on our protocol to give users full ownership of
              their data.
            </Typography>
            <Typography variant="body1" component="li">
              You must download the Gateway Wallet, create a new ID for
              migrating your data to the new protocol.
            </Typography>
            <Typography variant="body1" component="li">
              After the migration, your data will be available on your new
              Gateway ID, in addition to being available on your Gateway Wallet
            </Typography>
          </ul>
        </Box>
        <GTWLink href="#" color="primary" underline="hover">
          Learn more about the migration.
        </GTWLink>

        <Countdown></Countdown>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={onAccept}
        >
          Migrate my data
        </Button>

        <Button variant="outlined" color="primary" fullWidth onClick={onClose}>
          Skip for now
        </Button>
      </Stack>
    </>
  );
}
