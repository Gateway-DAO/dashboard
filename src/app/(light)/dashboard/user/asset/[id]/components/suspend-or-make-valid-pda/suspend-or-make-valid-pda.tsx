import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import { LoadingButton } from '@/components/buttons/loading-button/loading-button';
import ConfirmDialog from '@/components/modal/confirm-dialog/confirm-dialog';
import { mutations } from '@/constants/queries';
import { useGtwSession } from '@/context/gtw-session-provider';
import { common } from '@/locale/en/common';
import { errorMessages } from '@/locale/en/errors';
import { pda as pdaLocale } from '@/locale/en/pda';
import {
  ChangePdaStatusMutationVariables,
  PdaQuery,
  PdaStatus,
} from '@/services/protocol/types';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { PartialDeep } from 'type-fest/source/partial-deep';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';

type Props = {
  pda: PartialDeep<PdaQuery['PDAbyId'] | null>;
};

export function SuspendOrMakeValidPDA({ pda }: Props) {
  const { privateApi } = useGtwSession();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [dialogConfirmation, setDialogConfirmation] = useState(false);

  const mutationReq = {
    mutationKey: [mutations.change_pda_status],
    mutationFn: (data: ChangePdaStatusMutationVariables) => {
      return privateApi?.changePDAStatus(data);
    },
    onSuccess: () => router.refresh(),
    onError: () => enqueueSnackbar(errorMessages.STATUS_CHANGE_ERROR),
  };

  const suspendPda = useMutation(mutationReq);
  const makeValidPda = useMutation(mutationReq);

  const isValid = useMemo(() => pda?.status === PdaStatus.Valid, [pda]);
  const isSuspended = useMemo(() => pda?.status === PdaStatus.Suspended, [pda]);

  return (
    <>
      {isValid && (
        <LoadingButton
          variant="outlined"
          startIcon={<DoNotDisturbAltIcon />}
          size="large"
          color="warning"
          fullWidth
          isLoading={suspendPda.isLoading}
          sx={{
            mb: 2,
          }}
          onClick={() => setDialogConfirmation(true)}
        >
          {common.actions.suspend}
        </LoadingButton>
      )}

      {isSuspended && (
        <LoadingButton
          variant="contained"
          startIcon={<CheckCircleIcon />}
          size="large"
          color="success"
          fullWidth
          isLoading={makeValidPda.isLoading}
          sx={{
            mb: 2,
            color: 'common.white',
          }}
          onClick={() => setDialogConfirmation(true)}
        >
          {common.actions.make_valid}
        </LoadingButton>
      )}

      <ConfirmDialog
        title={
          isValid
            ? pdaLocale.change_status.dialog_title_suspend
            : pdaLocale.change_status.dialog_title_valid
        }
        open={dialogConfirmation}
        positiveAnswer={
          isValid ? common.actions.suspend : common.actions.make_valid
        }
        negativeAnswer={common.actions.cancel}
        setOpen={setDialogConfirmation}
        onConfirm={() => {
          if (pda?.status === PdaStatus.Valid) {
            suspendPda.mutateAsync({
              id: pda?.id as string,
              status: PdaStatus.Suspended,
            });
          }
          if (pda?.status === PdaStatus.Suspended) {
            makeValidPda.mutateAsync({
              id: pda?.id as string,
              status: PdaStatus.Valid,
            });
          }
        }}
      >
        {pdaLocale.change_status.dialog_text}
      </ConfirmDialog>
    </>
  );
}
