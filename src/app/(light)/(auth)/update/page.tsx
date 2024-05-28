import GTWLogo from '@/components/gtw-logo/gtw-logo';

import { Box, Stack, Typography } from '@mui/material';

import AuthContentBox from '../components/auth-content-box';
import UpdateQrCode from './update-qr-code';

export default function UpdatePage() {
  return (
    <AuthContentBox>
      <Stack direction="row" gap={1} alignItems="center" mb={10}>
        <GTWLogo isHeader={false} />
      </Stack>
      <Typography variant="h2" component="h1" mb={2}>
        Update
      </Typography>
      <Box
        p={2}
        border="1px solid"
        borderColor="divider"
        display="inline-block"
        borderRadius={1.5}
        mb={2}
      >
        <UpdateQrCode />
      </Box>
    </AuthContentBox>
  );
}
