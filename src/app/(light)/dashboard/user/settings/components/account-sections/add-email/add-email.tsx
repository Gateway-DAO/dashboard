import { useState } from 'react';

import { CardSummary } from '@/app/(light)/login/components/card-summary';
import Loading from '@/components/loadings/loading/loading';
import { useGtwSession } from '@/context/gtw-session-provider';
import { errorMessages } from '@/locale/en/errors';
import { settings } from '@/locale/en/settings';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { FormProvider, useForm } from 'react-hook-form';

import { Stack } from '@mui/material';

import { EmailSchema, TokenConfirmationSchema, schemaEmail } from './schema';
import SendEmail from './sendEmail';
import VerifyToken from './verifyToken';

type Props = {
  onSuccess: () => void;
};

export default function AddEmail({ onSuccess }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const [sentEmail, setSentEmail] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const { privateApi } = useGtwSession();

  const methodsAddEmail = useForm({
    resolver: zodResolver(schemaEmail as any), // TODO: Add right types
  });

  const methodsConfirmToken = useForm<TokenConfirmationSchema>();

  const onEdit = () => {
    setSentEmail(false);
  };

  const addEmail = useMutation({
    mutationFn: async (data: { email: string }) => {
      try {
        const res = await privateApi.protocol_add_email(data);
        return res;
      } catch (e: any) {
        if (e?.response?.errors?.[0]?.message === 'EMAIL_ALREADY_REGISTERED') {
          return privateApi.create_email_nonce(data);
        }
        throw e;
      }
    },
  });

  const onSubmitEmail = async (data: EmailSchema) => {
    try {
      await addEmail.mutateAsync({ email: data.email_address });
      setSentEmail(true);
      setEmail(data.email_address);
    } catch (e) {
      (e as any)?.response?.errors?.forEach(({ message }: any) => {
        enqueueSnackbar(
          (errorMessages as any)[message] || errorMessages.UNEXPECTED_ERROR,
          {
            variant: 'error',
          }
        );
      });
    }
  };

  const confirmToken = useMutation({
    mutationFn: async ({ code }: TokenConfirmationSchema) =>
      privateApi.protocol_add_email_confirmation({
        code: parseInt(code, 10),
        email: email as string,
      }),
  });

  const onSubmitConfirmToken = async (data: TokenConfirmationSchema) => {
    try {
      await confirmToken.mutateAsync(data);
      onSuccess();
    } catch (error: any) {
      (error?.response as any)?.errors?.forEach(({ message }: any) => {
        if (message === 'MAXIMUM_ATTEMPTS_REACHED') {
          setSentEmail(false);
        }
        enqueueSnackbar(
          (errorMessages as any)[message] || errorMessages.UNEXPECTED_ERROR,
          {
            variant: 'error',
          }
        );
      });
    }
  };

  return (
    <Stack sx={{ mb: 4, pt: 2 }}>
      {confirmToken?.isLoading ? (
        <Loading />
      ) : (
        <>
          {!sentEmail ? (
            <FormProvider {...methodsAddEmail}>
              <SendEmail
                onSubmitSendEmail={onSubmitEmail}
                isLoading={addEmail.isLoading}
                disabledField={sentEmail}
              />
            </FormProvider>
          ) : (
            <>
              <CardSummary
                title={settings.connected_accounts.add_email.card_summary_title}
                onClickEdit={onEdit}
                email={email as string}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  mb: 5,
                }}
              />
              <FormProvider {...methodsConfirmToken}>
                <VerifyToken
                  onSubmitConfirmToken={onSubmitConfirmToken}
                  isLoadingConfirmToken={confirmToken.isLoading}
                  onSubmitSendEmail={onSubmitEmail}
                  isLoadingSendEmail={addEmail.isLoading}
                  email={email as string}
                />
              </FormProvider>
            </>
          )}
        </>
      )}
    </Stack>
  );
}
