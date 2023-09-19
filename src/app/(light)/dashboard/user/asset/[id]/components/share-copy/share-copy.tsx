'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { LoadingButton } from '@/components/buttons/loading-button/loading-button';
import ModalRight from '@/components/modal/modal-right/modal-right';
import ModalTitle from '@/components/modal/modal-title/modal-title';
import { mutations, queries } from '@/constants/queries';
import routes from '@/constants/routes';
import { useGtwSession } from '@/context/gtw-session-provider';
import { common } from '@/locale/en/common';
import { errorMessages } from '@/locale/en/errors';
import { pda as pdaLocale } from '@/locale/en/pda';
import {
  Create_ProofMutationVariables,
  PdaQuery,
} from '@/services/protocol/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToggle } from '@react-hookz/web/cjs/useToggle';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { FieldValues, useForm } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { Stack, Typography } from '@mui/material';
import { Button } from '@mui/material';

import { ShareCopySchema, shareCopySchema } from './schema';
import ShareCopyFormField from './share-copy-form-fields';
import ShareCopyFormSuccessfully from './share-copy-form-successfully';

type Props = {
  pda: PartialDeep<PdaQuery['PDAbyId'] | null>;
};

export default function ShareCopy({ pda }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [openShareCopy, setOpenShareCopy] = useToggle(false);
  const [pdaIssued, setPdaIssued] = useState<string>();
  const { privateApi } = useGtwSession();
  const queryClient = useQueryClient();

  const methods = useForm({
    resolver: zodResolver(shareCopySchema as any),
    mode: 'all',
  });

  const toggleModal = () => {
    if (openShareCopy) {
      methods.reset();
      router.push(routes.dashboardUserAsset(pda?.id));
      setPdaIssued(undefined);
    } else {
      router.push('#share-copy');
    }
    setOpenShareCopy();
  };

  const createProof = useMutation({
    mutationKey: [mutations.create_proof],
    mutationFn: (data: Create_ProofMutationVariables) => {
      return privateApi?.create_proof(data);
    },
  });

  const handleMutation = async (
    data: ShareCopySchema | FieldValues
  ): Promise<any> => {
    if (!(await methods.trigger())) return;
    try {
      const res = await createProof.mutateAsync({
        claims: [
          {
            claimKeys: Object.keys(pda?.dataAsset?.claim) ?? [],
            pdaId: pda?.id,
          },
        ],
        verifier: {
          type: data.identifier_type,
          value: data?.address ?? null,
        },
      });
      setPdaIssued(res?.createProof?.id);
      methods.reset();
      queryClient.refetchQueries([queries.proofs_by_pdas_id, [pda?.id]]);
      router.refresh();
    } catch (e: any) {
      if (e.message === 'VERIFIER_NOT_FOUND') {
        methods.setError('address', {
          message: errorMessages.VERIFIER_NOT_FOUND,
        });
      } else {
        enqueueSnackbar(errorMessages.ERROR_TRYING_TO_ISSUE_A_PROOF);
      }
    }
  };

  return (
    <>
      <Button
        variant="contained"
        size="large"
        fullWidth
        sx={{
          mb: 2,
        }}
        onClick={() => {
          router.push('#share-copy');
          setOpenShareCopy(true);
        }}
      >
        {common.actions.share_a_copy}
      </Button>
      <ModalRight open={openShareCopy} onClose={toggleModal}>
        <ModalTitle onClose={toggleModal} />
        {pdaIssued ? (
          <ShareCopyFormSuccessfully id={pdaIssued} />
        ) : (
          <FormProvider {...methods}>
            <Stack
              component="form"
              id="share-copy-form"
              onSubmit={methods.handleSubmit(handleMutation)}
            >
              <Typography fontSize={34}>
                {pdaLocale.share.share_a_copy_with}
              </Typography>
              <Typography sx={{ mb: 6 }}>
                {pdaLocale.share.share_a_copy_description}
              </Typography>
              <ShareCopyFormField />
              <LoadingButton
                variant="contained"
                type="submit"
                sx={{
                  mt: 3,
                }}
                id="share-copy-button"
                isLoading={createProof?.isLoading}
              >
                {common.actions.share_now}
              </LoadingButton>
            </Stack>
          </FormProvider>
        )}
      </ModalRight>
    </>
  );
}
