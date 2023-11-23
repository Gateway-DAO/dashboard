'use client';
import Link from 'next/link';

import routes from '@/constants/routes';
import { common } from '@/locale/en/common';
import { issuePdaForm } from '@/locale/en/pda';
import { numberToMoneyString } from '@/utils/money';

import { ChevronRight } from '@mui/icons-material';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';

type Props = {
  amount: number;
  total: string;
};

export default function Summary({ amount, total }: Props) {
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
        component={Stack}
        elevation={24}
        sx={{
          p: 3,
          pb: 4,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          margin: '0 auto',
          maxWidth: 660,
        }}
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
          <Button type="submit" variant="contained" endIcon={<ChevronRight />}>
            {common.general.review}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
