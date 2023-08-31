'use client';
import { useCountdown } from '@/hooks/use-countdown';
import { useToggle } from '@react-hookz/web';
import { useSnackbar } from 'notistack';

import { CodeField } from '../components/code-field';

export function VerifyEmailLoginToken() {
  const { enqueueSnackbar } = useSnackbar();
  const [startCountdown, setStartCountdown] = useToggle(true);
  const countdown = useCountdown({ time: 30, trigger: startCountdown });

  const onResendEmail = async () => {
    try {
      console.log('test');
      setStartCountdown();
    } catch (e: any) {
      enqueueSnackbar(e.message, {
        variant: 'error',
      });
      setStartCountdown();
    }
  };

  const onSubmitConfirmToken = async (data: any) => {
    console.log('test', data);
  };

  return (
    <CodeField
      onClickEdit={() => console.log('reset')}
      onSubmitConfirmCode={onSubmitConfirmToken}
      isLoadingConfirmCode={false}
      onResendEmail={onResendEmail}
      isLoadingOnResend={false}
      countdown={countdown}
      email={'test@test.com'}
    />
  );
}
