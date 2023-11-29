import ClaimValuesList from '@/app/(light)/dashboard/components/claim-values-list/claim-values-list';
import { LoadingButton } from '@/components/buttons/loading-button/loading-button';
import IssuanceIcon from '@/components/icons/issuance';
import { common } from '@/locale/en/common';
import { CredentialData } from '@/services/protocol/types';
import { getClaimTitle } from '@/utils/get-claim-type';
import { numberToMoneyString } from '@/utils/money';

import { EditOutlined } from '@mui/icons-material';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';

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
  const schemaProperties = schema.properties;

  const claims: CredentialData[] = Object.keys(data.claim).map((key) => {
    const label = getClaimTitle(schemaProperties[key]);
    return {
      ...schemaProperties[key],
      label,
      value: (data.claim as any)[key],
    } as CredentialData;
  });

  console.log(claims, data.claim, schema);

  return (
    <>
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
          <Button disabled={isLoading} variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <LoadingButton
            isLoading={isLoading}
            variant="contained"
            onClick={onSubmit}
            endIcon={<IssuanceIcon />}
          >
            Issue now
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
        <Box mt={2}>OWNERSHIP</Box>
        <Divider sx={{ mx: -3, my: 4 }} />
        <ClaimValuesList title="Claims" data={claims} />
      </Box>
    </>
  );
}
