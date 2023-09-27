import { LoadingButton } from '@/components/buttons/loading-button/loading-button';
import { useCountdown } from '@/hooks/use-countdown';
import { common } from '@/locale/en/common';
import { settings } from '@/locale/en/settings';
import { useToggle } from '@react-hookz/web';
import { useFormContext } from 'react-hook-form';

import { Stack, TextField, Typography } from '@mui/material';

import { TokenConfirmationSchema, EmailSchema } from './schema';

type Props = {
  onSubmitConfirmToken: (data: TokenConfirmationSchema) => void;
  isLoadingConfirmToken: boolean;
  onSubmitSendEmail: (data: EmailSchema) => void;
  isLoadingSendEmail: boolean;
  email: string;
};

export default function VerifyToken({
  onSubmitConfirmToken,
  isLoadingConfirmToken,
  onSubmitSendEmail,
  isLoadingSendEmail,
  email,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<TokenConfirmationSchema>();

  const [startCountdown, setStartCountdown] = useToggle(true);
  const countdown = useCountdown({ time: 30, trigger: startCountdown });

  const sendEmailAgain = () => {
    onSubmitSendEmail({ email_address: email });
    setStartCountdown();
  };

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmitConfirmToken)}
      gap={3}
    >
      <Typography sx={{ color: 'text.secondary.main' }}>
        {settings.connected_accounts.verify_token.description1}{' '}
        <span style={{ color: 'common.white' }}>{email}</span>{' '}
        {settings.connected_accounts.verify_token.description2}
      </Typography>
      <TextField
        sx={{ mb: 2 }}
        variant="outlined"
        type="text"
        error={!!errors?.code}
        helperText={errors.code?.message}
        {...register('code', { required: true })}
        placeholder={settings.connected_accounts.verify_token.code_placeholder}
      />
      <Stack direction="row">
        <LoadingButton
          variant="contained"
          type="submit"
          isLoading={isLoadingConfirmToken}
          sx={{
            height: 48,
            mr: 1,
          }}
        >
          {common.actions.verify}
        </LoadingButton>
        <LoadingButton
          variant="outlined"
          type="button"
          disabled={countdown?.counting}
          sx={{ height: 48 }}
          isLoading={isLoadingSendEmail}
          onClick={() => sendEmailAgain()}
        >
          {common.actions.code_send_again}{' '}
          {countdown?.counting ? ` (${countdown.time})` : ' '}
        </LoadingButton>
      </Stack>
    </Stack>
  );
}
