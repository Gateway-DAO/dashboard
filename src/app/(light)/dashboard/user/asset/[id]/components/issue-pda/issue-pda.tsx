'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { LoadingButton } from '@/components/buttons/loading-button';
import ModalRight from '@/components/modal/modal-right';
import ModalTitle from '@/components/modal/modal-title';
import { mutations } from '@/constants/queries';
import { common } from '@/locale/en/common';
import { errorMessages } from '@/locale/en/errors';
import { pda as pdaLocale } from '@/locale/en/pda';
import { getApiPrivate } from '@/services/protocol/api';
import {
  Create_ProofMutationVariables,
  PdaQuery,
} from '@/services/protocol/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToggle } from '@react-hookz/web/cjs/useToggle';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { FieldValues, useForm } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { Stack, Typography } from '@mui/material';
import { Button } from '@mui/material';

import IssuePdaFormField from './issue-pda-form-fields';
import IssuePdaFormSuccessfully from './issue-pda-form-successfully';
import { IssuePdaSchema, issuePdaSchema } from './schema';

type Props = {
  pda: PartialDeep<PdaQuery['PDAbyId'] | null>;
};

export default function IssuePda({ pda }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [openIssuePda, setOpenIssuePda] = useToggle(false);
  const [pdaIssued, setPdaIssued] = useState<string>();

  const methods = useForm({
    resolver: zodResolver(issuePdaSchema as any),
  });

  const toggleModal = () => {
    if (openIssuePda) {
      router.back();
      setPdaIssued(undefined);
    } else {
      router.push('#issue-pda');
    }
    setOpenIssuePda();
  };

  const createProof = useMutation({
    mutationKey: [mutations.create_proof],
    mutationFn: async (data: Create_ProofMutationVariables) => {
      const apiPrivate = await getApiPrivate();
      return apiPrivate?.create_proof(data);
    },
  });

  const handleMutation = async (
    data: IssuePdaSchema | FieldValues
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
        verifier: data?.address ?? null,
        organizationId: null,
        requestId: null,
      });
      setPdaIssued(res?.createProof?.id);
      methods.reset();
    } catch (e) {
      enqueueSnackbar(errorMessages.ERROR_TRYING_TO_ISSUE_A_PROOF);
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
          router.push('#issue-pda');
          setOpenIssuePda(true);
        }}
      >
        {common.actions.share_a_copy}
      </Button>
      <ModalRight open={openIssuePda} onClose={toggleModal}>
        <ModalTitle onClose={toggleModal} />
        {pdaIssued ? (
          <IssuePdaFormSuccessfully id={pdaIssued} />
        ) : (
          <FormProvider {...methods}>
            <Stack
              component="form"
              id="issue-pda-form"
              onSubmit={methods.handleSubmit(handleMutation)}
            >
              <Typography fontSize={34}>
                {pdaLocale.share.share_a_copy_with}
              </Typography>
              <Typography sx={{ mb: 6 }}>
                {pdaLocale.share.share_a_copy_description}
              </Typography>
              <IssuePdaFormField />
              <LoadingButton
                variant="contained"
                type="submit"
                sx={{
                  mt: 3,
                }}
                id="issue-pda-button"
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
