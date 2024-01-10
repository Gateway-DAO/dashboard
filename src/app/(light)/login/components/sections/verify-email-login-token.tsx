'use client';
import { signIn } from 'next-auth/react';

import { useCountdown } from '@/hooks/use-countdown';
import { auth } from '@/locale/en/auth';
import { ErrorCode, getErrorFromCode } from '@/locale/en/errors';
import { apiPublic } from '@/services/protocol/api';
import { useToggle } from '@react-hookz/web';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

import { useLoginStepState } from '../../providers/step-provider/step-provider';
import useLoginStepHandler from '../../providers/step-provider/use-login-step-handler';
import { CodeField } from '../code-field';

export function VerifyEmailLoginToken() {
  const { enqueueSnackbar } = useSnackbar();
  const [startCountdown, setStartCountdown] = useToggle(true);
  const onHandleSession = useLoginStepHandler();
  const countdown = useCountdown({ time: 30, trigger: startCountdown });

  const { values, setStepState } = useLoginStepState();
  const email = values?.email ?? '';

  const resendEmail = useMutation({
    mutationKey: ['resendEmail'],
    mutationFn: async () => apiPublic.create_email_nonce({ email }),
  });

  const sendConfirmationToken = useMutation({
    mutationKey: ['sendConfirmationToken'],
    mutationFn: (code: string) =>
      signIn('credential-email', {
        email,
        code,
        redirect: false,
      }),
  });

  const onResendEmail = async () => {
    try {
      await resendEmail.mutateAsync();
      setStartCountdown();
    } catch (e: any) {
      enqueueSnackbar(e.message, {
        variant: 'error',
      });
      setStartCountdown();
    }
  };

  const onSubmit = async (code: string) => {
    try {
      const res = await sendConfirmationToken.mutateAsync(code);
      if (!!res?.error) {
        throw res.error;
      }
      const step = await onHandleSession();
      if (step === 'completed') {
        enqueueSnackbar(auth.connection_modal.success.description, {
          variant: 'success',
        });
      }
    } catch (error: any) {
      const code: ErrorCode = (error as string).split(':')[0] as ErrorCode;
      const message = getErrorFromCode(code);

      enqueueSnackbar(message, {
        variant: 'error',
      });

      if (code === 'MAXIMUM_ATTEMPTS_REACHED') {
        setStepState({ step: 'initial' });
      }
    }
  };

  return (
    <CodeField
      onClickEdit={() => setStepState({ step: 'initial' })}
      onSubmitConfirmCode={onSubmit}
      isLoadingConfirmCode={sendConfirmationToken.isLoading}
      onResendEmail={onResendEmail}
      isLoadingOnResend={resendEmail.isLoading}
      countdown={countdown}
      email={email}
      title={auth.steps.verify_token.title}
    />
  );
}
