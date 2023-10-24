import { useToggle } from '@react-hookz/web';

import {
  MoreHorizOutlined,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';

export default function WalletBalance({ value }: { value?: string }) {
  const [valueVisible, setVisible] = useToggle(true);

  return (
    <Stack data-testid="hero__wallet-balance" mt={5} gap={1}>
      <Box display="flex" gap={1}>
        <Typography variant="subtitle1" color="text.secondary">
          Wallet balance
        </Typography>
        <IconButton onClick={setVisible} size="small">
          {valueVisible ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
        </IconButton>
      </Box>
      <Typography variant="h4" data-testid="wallet-balance__balance">
        {valueVisible ? (
          <>{value ?? '$0'}</>
        ) : (
          <MoreHorizOutlined sx={{ fontSize: 'inherit' }} />
        )}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Manage the money you earn and spend on Gateway
      </Typography>
    </Stack>
  );
}
