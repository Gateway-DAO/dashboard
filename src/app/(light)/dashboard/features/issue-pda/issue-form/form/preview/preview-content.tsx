'use client';
import ClaimValuesList from '@/app/(light)/dashboard/components/claim-values-list/claim-values-list';
import { LoadingButton } from '@/components/buttons/loading-button/loading-button';
import CardCell from '@/components/card-cell/card-cell';
import { TableCellContainer } from '@/components/containers/table-cell-container/table-cell-container';
import IssuanceIcon from '@/components/icons/issuance';
import UsersFromTo from '@/components/users-from-to/users-from-to';
import { DATE_FORMAT } from '@/constants/date';
import { queries } from '@/constants/queries';
import { useGtwSession } from '@/context/gtw-session-provider';
import useOrganization from '@/hooks/use-organization';
import { common } from '@/locale/en/common';
import { pda } from '@/locale/en/pda';
import { apiPublic } from '@/services/protocol/api';
import { UserIdentifierType } from '@/services/protocol/types';
import { PdaClaim } from '@/services/protocol/types';
import { getClaimTitle } from '@/utils/get-claim-type';
import getOrganizationOrUserData from '@/utils/get-organization-or-user-data';
import { numberToMoneyString } from '@/utils/money';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { EditOutlined } from '@mui/icons-material';
import { Box, Button, Card, Divider, Stack, Typography } from '@mui/material';

import { PreviewModalProps } from './type';

type Props = Omit<PreviewModalProps, 'isOpen'> & {
  isLoading: boolean;
  onSubmit: () => void;
};

export default function PreviewContent({
  amount,
  data,
  price,
  total,
  schema,
  isLoading,
  onSubmit,
  onClose,
}: Props) {
  const { session } = useGtwSession();
  const { organization } = useOrganization();

  const { data: userData } = useQuery({
    queryKey: [queries.user_info, data.owner?.type, data.owner?.value],
    queryFn: async () =>
      apiPublic.get_user_info({
        identification: {
          type: data.owner?.type,
          value: data.owner?.value,
        },
      }),
    select: (data) => data.user,
    enabled: !!data && data.owner.type === UserIdentifierType.GatewayId,
  });

  if (!data) return null;

  const from = getOrganizationOrUserData(session.user, organization);
  const to = getOrganizationOrUserData(
    !!userData
      ? userData
      : {
          id: '',
          gatewayId: data.owner.value,
          displayName: data.owner.value,
          profilePicture: '',
          createdAt: '',
        }
  );

  const schemaProperties = schema.properties;

  const claims: PdaClaim[] = Object.keys(data.claim).map((key) => {
    const label = getClaimTitle(schemaProperties[key], key);
    return {
      ...schemaProperties[key],
      label,
      value: (data.claim as any)[key],
    } as PdaClaim;
  });

  return (
    <>
      <Typography variant="h5">{pda.issuance_summary}</Typography>
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
          <Typography>{pda.total}</Typography>
          <Typography variant="h5">{total}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="flex-end" mt={4} gap={1}>
          <Button disabled={isLoading} variant="outlined" onClick={onClose}>
            {common.actions.cancel}
          </Button>
          <LoadingButton
            isLoading={isLoading}
            variant="contained"
            onClick={onSubmit}
            endIcon={<IssuanceIcon />}
          >
            {common.actions.issue_now}
          </LoadingButton>
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
          <Button
            disabled={isLoading}
            onClick={onClose}
            endIcon={<EditOutlined />}
          >
            {common.actions.edit}
          </Button>
        </Stack>
        <Typography mt={2}>{data.description}</Typography>
        <Stack
          component={Card}
          variant="outlined"
          sx={{ mt: 2, overflow: 'visible' }}
          divider={<Divider sx={{ width: '100%' }} />}
        >
          <UsersFromTo
            from={from}
            to={to}
            fromLabel={pda.data_contributor}
            toLabel={pda.owner}
            isVertical
          />
          <TableCellContainer>
            <CardCell label={pda.issuance_date}>
              {dayjs(new Date()).format(DATE_FORMAT)}
            </CardCell>
            <CardCell label={pda.expiration_date}>{pda.indeterminate}</CardCell>
          </TableCellContainer>
        </Stack>
        {claims.length > 0 && (
          <>
            <Divider sx={{ mx: -3, my: 4 }} />
            <ClaimValuesList title="Claims" data={claims} />
          </>
        )}
      </Box>
    </>
  );
}
