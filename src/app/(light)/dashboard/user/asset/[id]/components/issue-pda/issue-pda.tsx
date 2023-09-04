'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { LoadingButton } from '@/components/buttons/loading-button';
import ModalRight from '@/components/modal/modal-right';
import ModalTitle from '@/components/modal/modal-title';
import { common } from '@/locale/en/common';
import { pda } from '@/locale/en/pda';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToggle } from '@react-hookz/web/cjs/useToggle';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';

import { Stack, Typography } from '@mui/material';
import { Button } from '@mui/material';

import IssuePdaFormField from './issue-pda-form-fields';
import IssuePdaFormSuccessfully from './issue-pda-form-successfully';
import IssuePdaFormSuccessSkeleton from './issue-pda-form-successfully-skeleton';
import { issuePdaSchema } from './schema';

export default function IssuePda() {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [openIssuePda, setOpenIssuePda] = useToggle(false);
  const [pdaIssued, setPdaIssued] = useState<string>();

  // TODO: REMOVE MOCK
  const [loading0, setLoading0] = useState<boolean>(false);
  // TODO: REMOVE MOCK
  const [loading1, setLoading1] = useState<boolean>(false);

  const methods = useForm({
    resolver: zodResolver(issuePdaSchema as any),
  });

  const handleMutation = async (_data: any) => {
    if (!(await methods.trigger())) return;
    try {
      setPdaIssued('id');
      methods.reset();
    } catch (e) {
      enqueueSnackbar('test');
    }
  };

  const toggleModal = () => {
    if (openIssuePda) {
      router.back();
      setPdaIssued(undefined);
    } else {
      router.push('#issue-pda');
    }
    setOpenIssuePda();
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
          <>
            {loading1 ? (
              <IssuePdaFormSuccessSkeleton />
            ) : (
              <IssuePdaFormSuccessfully id={pdaIssued} />
            )}
          </>
        ) : (
          <FormProvider {...methods}>
            <Stack
              component="form"
              id="issue-pda-form"
              onSubmit={methods.handleSubmit(handleMutation)}
            >
              <Typography fontSize={34}>
                {pda.share.share_a_copy_with}
              </Typography>
              <Typography sx={{ mb: 6 }}>
                {pda.share.share_a_copy_description}
              </Typography>
              <IssuePdaFormField />
              <LoadingButton
                variant="contained"
                type="submit"
                sx={{
                  mt: 3,
                }}
                id="issue-pda-button"
                isLoading={loading0} // TODO: REMOVE MOCK
                onClick={() => {
                  // TODO: REMOVE MOCK
                  setLoading0(true);
                  setTimeout(() => {
                    setLoading0(false);
                    setLoading1(true);
                    setPdaIssued('id');
                    setTimeout(() => {
                      setLoading1(false);
                    }, 2000);
                  }, 2000);
                }}
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
