import { wallet } from '@/locale/en/wallet';
import { numberToMoneyString } from '@/utils/money';

import {
  MoreHorizOutlined,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from '@mui/icons-material';
import { Box, IconButton, Skeleton, Stack, Typography } from '@mui/material';

type Props = {
  value?: number;
  valueVisible: boolean;
  setVisible: any;
  isLoading?: boolean;
};

export default function WalletBalance({
  value,
  valueVisible,
  setVisible,
  isLoading,
}: Props) {
  return (
    <Stack data-testid="hero__wallet-balance" mt={5} gap={1}>
      <Box display="flex" gap={1}>
        <Typography variant="subtitle1" color="text.secondary">
          {wallet.page.balance_title}
        </Typography>
        <IconButton
          data-testid="wallet-balance__button-toggle"
          onClick={setVisible}
          size="small"
        >
          {valueVisible ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
        </IconButton>
      </Box>
      <Typography variant="h4" data-testid="wallet-balance__balance">
        {isLoading ? (
          <Skeleton width={150} />
        ) : (
          <>
            {valueVisible ? (
              <>{value ? numberToMoneyString(value) : '$0'}</>
            ) : (
              <MoreHorizOutlined sx={{ fontSize: 'inherit' }} />
            )}
          </>
        )}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {wallet.page.balance_description}
      </Typography>
    </Stack>
  );
}
