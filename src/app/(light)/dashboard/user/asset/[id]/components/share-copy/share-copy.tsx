'use client';
import { useRouter } from 'next-nprogress-bar';
import { useMemo, useState } from 'react';

import { LoadingButton } from '@/components/buttons/loading-button/loading-button';
import ModalRight from '@/components/modal/modal-right/modal-right';
import ModalTitle from '@/components/modal/modal-title/modal-title';
import { mutations, queries } from '@/constants/queries';
import routes from '@/constants/routes';
import { useGtwSession } from '@/context/gtw-session-provider';
import useOrganization from '@/hooks/use-organization';
import { common } from '@/locale/en/common';
import { errorMessages } from '@/locale/en/errors';
import { pda as pdaLocale } from '@/locale/en/pda';
import {
  Create_ProofMutationVariables,
  IdentifierType,
  PdaQuery,
  PdaStatus,
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
  pda: PartialDeep<PdaQuery['PDA'] | null>;
};

export default function ShareCopy({ pda }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [openShareCopy, setOpenShareCopy] = useToggle(false);
  const [pdaIssued, setPdaIssued] = useState<string>();
  const { privateApi, session } = useGtwSession();
  const queryClient = useQueryClient();
  const { organization } = useOrganization();

  const methods = useForm({
    resolver: zodResolver(shareCopySchema as any), // TODO: remove type any
    mode: 'all',
    defaultValues: {
      identifier_type: IdentifierType.GatewayId,
      address: '',
    },
  });

  const toggleModal = () => {
    if (openShareCopy) {
      methods.reset();
      router.push(routes.dashboardUserAsset(pda?.id), { scroll: false });
      setPdaIssued(undefined);
    } else {
      router.push('#share-copy', { scroll: false });
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
          type: data.type,
          value: data?.address ?? null,
        },
      });
      setPdaIssued(res?.createProof?.id);
      methods.reset();
      queryClient.refetchQueries([queries.proofs_by_pdas_id, [pda?.id]]);
      router.refresh();
    } catch (e: any) {
      if (e?.response?.errors?.[0].message === 'VERIFIER_NOT_FOUND') {
        methods.setError('address', {
          message: errorMessages.VERIFIER_NOT_FOUND,
        });
      } else {
        enqueueSnackbar(errorMessages.ERROR_TRYING_TO_ISSUE_A_PROOF);
      }
    }
  };

  const isOwner = useMemo(
    () =>
      session.user.gatewayId === pda?.dataAsset?.owner?.gatewayId &&
      !organization,
    [pda, session]
  );

  return (
    <>
      {isOwner && pda?.status === PdaStatus.Valid && (
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
            id="share-a-copy"
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
                  <Typography
                    component="h3"
                    fontSize={34}
                    id="share-a-copy-title"
                  >
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
                    id="share-copy-action"
                    disabled={!methods.formState.isValid}
                    isLoading={createProof?.isLoading}
                  >
                    {common.actions.share_now}
                  </LoadingButton>
                </Stack>
              </FormProvider>
            )}
          </ModalRight>
        </>
      )}
    </>
  );
}
