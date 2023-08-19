import useTranslation from 'next-translate/useTranslation';

import CardCell from '@/components/card-cell/card-cell';
import { limitCharsCentered } from '@/utils/string';

import { Stack } from '@mui/material';

type Props = {
  authenticatedBy: any; // TODO: Add types
};

export default function AuthenticatedBy({ authenticatedBy }: Props) {
  const { t } = useTranslation('protocol');

  const authenticatedByName =
    authenticatedBy?.gatewayId ?? authenticatedBy.primaryWallet.address;
  return (
    <CardCell label={t('credential.authenticated-by')}>
      <Stack
        title={authenticatedByName}
        sx={{
          color: 'primary',
          textDecoration: 'none',
          cursor: 'pointer',
          fontSize: 14,
        }}
        onClick={() => console.log('open tooltip')} //TODO: Implement tooltip
      >
        {limitCharsCentered(authenticatedByName, 20)}
      </Stack>
    </CardCell>
  );
}
