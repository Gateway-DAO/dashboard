'use client';

import { useSession } from 'next-auth/react';

import routes from '@/constants/routes';
import { common } from '@/locale/en/common';
import { wallet } from '@/locale/en/wallet';
import { useToggle } from '@react-hookz/web';

import {
  MoreHorizOutlined,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from '@mui/icons-material';
import { Button, Box, Stack, Typography, alpha } from '@mui/material';

import WalletWidgetSkeleton from './wallet-widget-skeleton';

type Props = {
  id: string;
};

export default function WalletWidget({ id }: Props) {
  const { data: session, status } = useSession();
  const [visible, setVisible] = useToggle(true);

  if (status === 'loading' || !session) {
    return <WalletWidgetSkeleton />;
  }

  const walletData = {
    value: 0.3,
  };

  return (
    <>
      <Box
        id={id}
        sx={(theme) => ({
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.focusOpacity
          ),
          borderRadius: theme.shape.borderRadius / 16, //Strange issue with MUI
          justifyContent: 'space-between',
          p: 2,
          mb: 2,
          alignItems: 'flex-start',
          flexDirection: 'column',
        })}
      >
        <Stack
          direction="row"
          alignItems="center"
          sx={{ justifyContent: 'space-between', width: '100%', mb: 2 }}
        >
          <Stack alignItems="flex-start">
            <Typography variant="caption" color="primary" lineHeight={1}>
              {wallet.sidebar_box.wallet_balance}
            </Typography>
            {visible ? (
              <Typography fontWeight={600} color="primary">
                {walletData.value
                  ? walletData.value.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      currencyDisplay: 'symbol',
                    })
                  : '$0.00'}
              </Typography>
            ) : (
              <Stack sx={{ overflow: 'hidden', height: 24 }}>
                <MoreHorizOutlined
                  sx={{ fontSize: 32, position: 'relative', top: -3 }}
                />
              </Stack>
            )}
          </Stack>
          <Button
            onClick={setVisible}
            size="small"
            sx={{ p: 0.5, m: 0, minWidth: 0 }}
          >
            {visible ? (
              <VisibilityOutlined color="primary" />
            ) : (
              <VisibilityOffOutlined color="primary" />
            )}
          </Button>
        </Stack>
        <Button
          href={routes.dashboardUserWallet}
          variant="outlined"
          fullWidth
          size="small"
        >
          {common.actions.view_more}
        </Button>
      </Box>
    </>
  );
}
