import ProofCardInfo from '@/app/dashboard/user/proof/[id]/components/proof-card-info';
import ProofCardTitle from '@/app/dashboard/user/proof/[id]/components/proof-card-title';
import { SuccessfullyIcon } from '@/components/icons/successfully-icon';
import { common } from '@/locale/en/common';
import { pda } from '@/locale/en/pda';

import LinkIcon from '@mui/icons-material/Link';
import { Box, Button, Stack, Typography } from '@mui/material';

type Props = {
  id: string;
};

export default function SendPdaFormSuccessfully({ }: Props) {
  // TODO: Remove MOCK
  const proof = {
    id: '7Cae5130c16e6c8b686440b900d93fe1291977e70b812d170024f1cffd0e3fe375',
    title: 'Chase',
    issuance_date: '2018-04-04T16:00:00.000Z',
    status: 'Valid',
    activities: [
      {
        type: 'Issued',
        txHash: 'txhash.com',
        timestamp: '2018-04-04T16:00:00.000Z',
      },
      {
        type: 'Revoked',
        txHash: 'txhash.com',
        timestamp: '2018-04-04T16:00:00.000Z',
      },
    ],
    sharing_cost: 0,
  };

  return (
    <Stack>
      <Box sx={{ position: 'absolute', top: { xs: 24, md: 48 } }}>
        <SuccessfullyIcon />
      </Box>
      <Typography fontSize={34} sx={{ mb: 6 }}>
        {pda.share.successfully_title}
      </Typography>
      <ProofCardTitle proof={proof} />
      <ProofCardInfo proof={proof} />
      <Button
        variant="contained"
        id="share-pda-button-check-now"
        sx={{ mb: 1.5 }}
      >
        {common.actions.check_now}
      </Button>
      <Button variant="outlined" id="share-pda-button-copy-url" sx={{ mb: 3 }}>
        <LinkIcon sx={{ mr: 1 }} />
        {common.actions.copy_url}
      </Button>
    </Stack>
  );
}
