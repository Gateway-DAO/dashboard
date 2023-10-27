'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import routes from '@/constants/routes';
import useOrganization from '@/hooks/use-organization';
import { common } from '@/locale/en/common';
import { wallet } from '@/locale/en/wallet';
import { numberToMoneyString } from '@/utils/money';
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
  const { organization } = useOrganization();
  const pathname = usePathname();

  if (status === 'loading' || !session) {
    return <WalletWidgetSkeleton />;
  }

  const walletData = {
    value: 0.3,
  };

  const walletPage = !!organization
    ? routes.dashboardOrgWallet(organization.gatewayId)
    : routes.dashboardUserWallet;

  return (
    <>
      {pathname !== walletPage && (
        <Box
          id={id}
          data-testid="wallet-widget"
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
                <Typography
                  fontWeight={600}
                  color="primary"
                  data-testid="wallet-widget__value"
                >
                  {numberToMoneyString(walletData.value)}
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
          <Link
            href={walletPage}
            passHref
            data-testid="wallet-widget__view-more"
          >
            <Button variant="outlined" fullWidth size="small">
              {common.actions.view_more}
            </Button>
          </Link>
        </Box>
      )}
    </>
  );
}
