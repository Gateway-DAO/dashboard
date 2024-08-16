'use client';
import Link from 'next/link';

import { LoadingButton } from '@/components/buttons/loading-button/loading-button';
import routes from '@/constants/routes';
import useMyWallet from '@/hooks/use-my-wallet';
import { common } from '@/locale/en/common';
import { errorMessages } from '@/locale/en/errors';
import { issuePdaForm } from '@/locale/en/pda';

import { ChevronRight } from '@mui/icons-material';
import { Alert, Box, Button, Paper, Stack, Typography } from '@mui/material';

type Props = {
  amount: number;
  total: string;
  canIssue: boolean;
};

export default function Summary({ amount, total, canIssue }: Props) {
  const { isLoading } = useMyWallet();
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: {
          xs: 56,
          lg: 0,
        },
        left: {
          xs: 0,
          lg: 300,
        },
        right: 0,
        zIndex: 1,
      }}
    >
      <Paper
        elevation={24}
        sx={{
          p: 3,
          pb: 4,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          margin: '0 auto',
          maxWidth: 660,
        }}
      >
        {!canIssue && !isLoading && (
          <Alert severity="error">
            {errorMessages.INSUFFICIENT_BALANCE_TO_PROCEED}
          </Alert>
        )}
        <Stack
          gap={4}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="subtitle1">
              {issuePdaForm.summary.title}
            </Typography>
            <Typography>{issuePdaForm.summary.total(total, amount)}</Typography>
          </Box>
          <Stack direction="row" gap={1}>
            <Button
              component={Link}
              href={routes.dashboard.user.issue}
              variant="outlined"
            >
              {common.general.cancel}
            </Button>
            <LoadingButton
              disabled={!canIssue}
              isLoading={isLoading}
              type="submit"
              variant="contained"
              endIcon={<ChevronRight />}
            >
              {common.general.review}
            </LoadingButton>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}
