'use client';
import IssuanceIcon from '@/components/icons/issuance';
import ModalTitle from '@/components/modal/modal-header/modal-header';
import ModalRight from '@/components/modal/modal-right/modal-right';
import UsersFromTo from '@/components/users-from-to/users-from-to';
import { useGtwSession } from '@/context/gtw-session-provider';
import useOrganization from '@/hooks/use-organization';
import { common } from '@/locale/en/common';
import { pda } from '@/locale/en/pda';
import { User } from '@/services/protocol/types';
import getOrganizationOrUserData from '@/utils/get-organization-or-user-data';
import { numberToMoneyString } from '@/utils/money';

import { EditOutlined } from '@mui/icons-material';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';

import { IssuePdaSchema } from './schema';

type Props = {
  amount: number;
  price: number;
  total: string;
  data?: IssuePdaSchema;
  isOpen: boolean;
  onClose: () => void;
};

export default function Preview({
  amount,
  price,
  total,
  isOpen,
  data,
  onClose,
}: Props) {
  const { session } = useGtwSession();
  const { organization } = useOrganization();
  const from = getOrganizationOrUserData(session.user as User, organization);
  const to = getOrganizationOrUserData({
    id: '',
    gatewayId: 'joaozinho',
    displayName: 'Joao Conserva',
    profilePicture: '',
    createdAt: '',
  });
  if (!data) return null;
  return (
    <ModalRight open={isOpen} onClose={onClose}>
      <ModalTitle onClose={onClose} />
      <Typography variant="h5">Issuance Summary</Typography>
      <Box mt={4} sx={{ p: 3, backgroundColor: 'primary.50', borderRadius: 1 }}>
        {[
          { label: 'PDA quantity', value: amount },
          {
            label: 'Cost per PDA',
            value: numberToMoneyString(price),
          },
        ].map(({ label, value }) => (
          <Stack
            direction="row"
            justifyContent="space-between"
            key={label}
            gap={1}
          >
            <Typography>{label}</Typography>
            <Typography>{value}</Typography>
          </Stack>
        ))}
        <Stack direction="row" justifyContent="space-between" gap={1} mt={2}>
          <Typography>Total</Typography>
          <Typography variant="h5">{total}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="flex-end" mt={4} gap={1}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={onClose}
            endIcon={<IssuanceIcon />}
          >
            Issue now
          </Button>
        </Stack>
      </Box>

      <Box
        mt={2}
        sx={{ borderRadius: 1, border: 1, borderColor: 'divider', p: 3 }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={1}
        >
          <Typography variant="h5">{data.title}</Typography>
          <Button onClick={onClose} endIcon={<EditOutlined />}>
            {common.actions.edit}
          </Button>
        </Stack>
        <Typography mt={2}>{data.description}</Typography>
        <Box mt={2}>
          <UsersFromTo
            from={from}
            to={to}
            fromLabel={pda.issuer}
            toLabel={pda.owner}
          />
        </Box>
        <Divider sx={{ mx: -3, my: 4 }} />
        <Typography variant="subtitle1">Claim</Typography>
      </Box>
    </ModalRight>
  );
}
