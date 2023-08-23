import CardCell from '@/components/card-cell/card-cell';
import { protocol } from '@/locale/en/protocol';
import { limitCharsCentered } from '@/utils/string';

import { Stack } from '@mui/material';

type Props = {
  authenticatedByName: string;
};

export default function AuthenticatedBy({ authenticatedByName }: Props) {
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
