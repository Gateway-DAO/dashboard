import CardCell from '@/components/card-cell/card-cell';
import { protocol } from '@/locale/en/protocol';
import { limitCharsCentered } from '@/utils/string';

import { Stack } from '@mui/material';

type Props = {
  authenticatedBy: any; // TODO: Add types
};

export default function AuthenticatedBy({ authenticatedBy }: Props) {
  const authenticatedByName =
    authenticatedBy?.gatewayId ?? authenticatedBy?.primaryWallet?.address;
  return (
    <CardCell label={protocol.pda.authenticated_by}>
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
