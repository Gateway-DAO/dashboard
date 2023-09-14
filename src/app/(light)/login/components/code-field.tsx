'use client';
import { LoadingButton } from '@/components/buttons/loading-button/loading-button';
import { CountdownType } from '@/hooks/use-countdown';
import { auth } from '@/locale/en/auth';
import { useForm } from 'react-hook-form';

import { Stack, TextField, Typography } from '@mui/material';

import { TokenConfirmationSchema } from '../schema';
import { CardSummary } from './card-summary';
import { TitleSubtitleField } from './title-field';

type Props = {
  onClickEdit: () => void;
  onSubmitConfirmCode: (data: TokenConfirmationSchema) => Promise<void>;
  isLoadingConfirmCode: boolean;
  onResendEmail: () => void;
  isLoadingOnResend: boolean;
  countdown: CountdownType;
  email: string;
};

export function CodeField({
  onClickEdit,
  onSubmitConfirmCode,
  isLoadingConfirmCode,
  onResendEmail,
  isLoadingOnResend,
  countdown,
  email,
}: Props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TokenConfirmationSchema>();

  return (
    <Stack
      component="form"
      direction="column"
      gap={2}
      onSubmit={handleSubmit(onSubmitConfirmCode)}
    >
      <CardSummary
        title={auth.card_summary_title}
        onClickEdit={onClickEdit}
        email={email}
        sxProps={{ top: { xs: -30, md: -40, lg: -50 } }}
      />
      <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
        {auth.steps.verify_token.title}
      </Typography>
      <TitleSubtitleField
        title={auth.steps.verify_token.description}
        subtitle={auth.steps.verify_token.caption}
      />
      <TextField
        required
        label={auth.steps.verify_token.label}
        id="code"
        type="text"
        inputMode="numeric"
        {...register('code')}
        error={!!errors?.code}
        helperText={errors?.code?.message as string}
      />
      <Stack direction="row" gap={1} sx={{ mt: 2 }}>
        <LoadingButton
          variant="contained"
          type="submit"
          sx={{ height: 48 }}
          isLoading={isLoadingConfirmCode}
        >
          {auth.steps.verify_token.action}
        </LoadingButton>
        <LoadingButton
          variant="outlined"
          type="button"
          sx={{ height: 48 }}
          isLoading={isLoadingOnResend}
          onClick={onResendEmail}
          disabled={countdown?.counting}
        >
          {auth.steps.verify_token.send_code_again}
          {countdown?.counting ? ` (${countdown.time})` : ' '}
        </LoadingButton>
      </Stack>
    </Stack>
  );
}
