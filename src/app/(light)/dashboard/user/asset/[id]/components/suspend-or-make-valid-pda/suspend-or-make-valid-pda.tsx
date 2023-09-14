import { LoadingButton } from '@/components/buttons/loading-button/loading-button';
import { common } from '@/locale/en/common';
import { CredentialStatus, PdaQuery } from '@/services/protocol/types';
import { PartialDeep } from 'type-fest/source/partial-deep';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';

type Props = {
  pda: PartialDeep<PdaQuery['PDAbyId'] | null>;
};

export function SuspendOrMakeValidPDA({ pda }: Props) {
  return (
    <>
      {pda?.dataAsset?.status === CredentialStatus.Valid && (
        <LoadingButton
          variant="outlined"
          startIcon={<DoNotDisturbAltIcon />}
          size="large"
          color="warning"
          fullWidth
          sx={{
            mb: 2,
          }}
          onClick={() => {
            console.log('Suspended');
          }}
        >
          {common.actions.suspend}
        </LoadingButton>
      )}

      {pda?.dataAsset?.status === CredentialStatus.Suspended && (
        <LoadingButton
          variant="contained"
          startIcon={<CheckCircleIcon />}
          size="large"
          color="success"
          fullWidth
          sx={{
            mb: 2,
            color: 'common.white',
          }}
          onClick={() => {
            console.log('Valid');
          }}
        >
          {common.actions.make_valid}
        </LoadingButton>
      )}
    </>
  );
}
