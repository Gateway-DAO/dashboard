'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

import { queries } from '@/constants/queries';
import routes from '@/constants/routes';
import { useGtwSession } from '@/context/gtw-session-provider';
import useOrganization from '@/hooks/use-organization';
import { common } from '@/locale/en/common';
import { wallet } from '@/locale/en/wallet';
import { My_BalanceQuery } from '@/services/protocol/types';
import { numberToMoneyString } from '@/utils/money';
import { useQuery } from '@tanstack/react-query';

import {
  MoreHorizOutlined,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from '@mui/icons-material';
import { Button, Box, Stack, Typography, alpha } from '@mui/material';

import { useWalletStore } from '../../../stores/wallet.store';
import WalletWidgetSkeleton from './wallet-widget-skeleton';

type Props = {
  id: string;
};

export default function WalletWidget({ id }: Props) {
  const { data: session, status } = useSession();
  const { privateApi } = useGtwSession();
  const { showValues: visible, toggleShowValue } = useWalletStore(
    (state) => state
  );
  const { organization } = useOrganization();

  const { data: myWallet, isLoading } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [
      queries.my_wallet,
      organization ? organization.id : session?.user.id,
    ],
    queryFn: () =>
      privateApi.my_balance({
        organizationId: organization?.id as string,
      }),
    select: (data: My_BalanceQuery) => data.myWallet,
  });

  const walletPage = !!organization
    ? routes.dashboard.org.wallet(organization.gatewayId)
    : routes.dashboard.user.wallet;

  if (status === 'loading' || !session || isLoading) {
    return <WalletWidgetSkeleton />;
  }

  return (
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
              {numberToMoneyString(myWallet?.balance as number)}
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
          onClick={toggleShowValue}
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
      <Link href={walletPage} passHref data-testid="wallet-widget__view-more">
        <Button variant="outlined" fullWidth size="small">
          {common.actions.view_more}
        </Button>
      </Link>
    </Box>
  );
}
