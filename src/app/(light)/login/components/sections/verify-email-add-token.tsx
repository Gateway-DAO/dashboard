'use client';
import { useCountdown } from '@/hooks/use-countdown';
import { errorMessages } from '@/locale/en/errors';
import { useToggle } from '@react-hookz/web';
import { useSnackbar } from 'notistack';

import { TokenConfirmationSchema } from '../../schema';
import { CodeField } from '../code-field';

export function VerifyEmailAddToken() {
  const { enqueueSnackbar } = useSnackbar();
  const [startCountdown, setStartCountdown] = useToggle(true);
  const countdown = useCountdown({ time: 30, trigger: startCountdown });

  const onResendEmail = async () => {
    try {
      console.log('onResend');
    } catch (e: any) {
      enqueueSnackbar(e.message, {
        variant: 'error',
      });
      setStartCountdown();
    }
  };

  const onSubmitConfirmToken = async (data: TokenConfirmationSchema) => {
    try {
      console.log('onSubmitConfirmToken', data);
    } catch (error: any) {
      (error.response as any)?.errors?.forEach(({ message }: any) => {
        if (message === 'MAXIMUM_ATTEMPTS_REACHED') {
          console.log('MAXIMUM');
        }
        enqueueSnackbar(
          errorMessages[message as keyof typeof errorMessages] ||
            errorMessages.UNEXPECTED_ERROR,
          {
            variant: 'error',
          }
        );
      });
    }
  };

  return (
    <CodeField
      title="" // TODO: Add a title
      onClickEdit={() => console.log('onNewUser')}
      onSubmitConfirmCode={onSubmitConfirmToken as any} // TODO: Change de type
      isLoadingConfirmCode={false}
      onResendEmail={onResendEmail}
      isLoadingOnResend={false}
      countdown={countdown}
      email={'test@test.com'}
    />
  );
}
