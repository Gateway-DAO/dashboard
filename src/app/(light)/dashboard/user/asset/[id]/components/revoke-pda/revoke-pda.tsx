import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import Loading from '@/components/loadings/loading/loading';
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

import CancelIcon from '@mui/icons-material/Cancel';
import { Button } from '@mui/material';

type Props = {
  pda: PartialDeep<PdaQuery['PDA'] | null>;
};

export function RevokePDA({ pda }: Props) {
  const { privateApi, session } = useGtwSession();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [dialogConfirmation, setDialogConfirmation] = useState(false);
  const [loadingAfter, setLoadingAfter] = useState(false);

  const revokePda = useMutation({
    mutationKey: [mutations.change_pda_status],
    mutationFn: (data: ChangePdaStatusMutationVariables) => {
      return privateApi?.changePDAStatus(data);
    },
    onSuccess: () => router.refresh(),
    onError: () => enqueueSnackbar(errorMessages.REVOKE_ERROR),
  });

  const isIssuer = useMemo(
    () =>
      session.user.gatewayId === pda?.dataAsset?.issuer?.gatewayId ||
      session?.user?.accesses?.find(
        (access) =>
          pda?.dataAsset?.organization?.gatewayId ===
          access?.organization?.gatewayId
      ),
    [pda, session]
  );

  return (
    <>
      {isIssuer && pda?.status !== PdaStatus.Revoked && (
        <>
          {loadingAfter && <Loading fullScreen />}
          <Button
            variant="outlined"
            startIcon={<CancelIcon />}
            size="large"
            color="error"
            fullWidth
            sx={{
              mb: 2,
            }}
            onClick={() => setDialogConfirmation(true)}
          >
            {common.actions.revoke}
          </Button>
          <ConfirmDialog
            title={pdaLocale.revoke.dialog_title}
            open={dialogConfirmation}
            positiveAnswer={common.actions.revoke}
            negativeAnswer={common.actions.cancel}
            setOpen={setDialogConfirmation}
            onConfirm={() =>
              revokePda
                .mutateAsync({
                  id: pda?.id as string,
                  status: PdaStatus.Revoked,
                })
                .finally(() => {
                  setLoadingAfter(true);
                  setTimeout(() => setLoadingAfter(false), 2000);
                })
            }
          >
            {pdaLocale.revoke.dialog_text}
          </ConfirmDialog>
        </>
      )}
    </>
  );
}
