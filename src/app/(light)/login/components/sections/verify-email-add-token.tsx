'use client';
import { useSession } from 'next-auth/react';

import { useGtwSession } from '@/context/gtw-session-provider';
import { useCountdown } from '@/hooks/use-countdown';
import { auth } from '@/locale/en/auth';
import { api } from '@/services/protocol/api';
import { useToggle } from '@react-hookz/web';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

import { useStepState } from '../../providers/step-provider';
import useStepHandler from '../../utils/use-step-handler';
import { CodeField } from '../code-field';

export function VerifyEmailAddToken() {
  const { enqueueSnackbar } = useSnackbar();
  const [startCountdown, setStartCountdown] = useToggle(true);
  const onHandleSession = useStepHandler();
  const countdown = useCountdown({ time: 30, trigger: startCountdown });

  const { data: session, update } = useSession()

  const { values, setStepState } = useStepState()
  const email = values?.email ?? "";

  const resendEmail = useMutation({
    mutationKey: ['resendEmail'],
    mutationFn: async () => api(session?.token ?? "").protocol_add_email({ email })
  })

  const sendConfirmationToken = useMutation({
    mutationKey: ['add-email', email],
    mutationFn: (code: string) => api(session?.token ?? "").protocol_add_email_confirmation({ email, code: parseInt(code) })
  })

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
      await sendConfirmationToken.mutateAsync(code);
      await update();
      await onHandleSession();

    } catch (e: any) {
      enqueueSnackbar(e.message, {
        variant: 'error',
      });
    }
  }

  return (
    <CodeField
      onClickEdit={() => setStepState({ step: "add-email" })}
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
