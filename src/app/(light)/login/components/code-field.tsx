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
  title: string;
  onClickEdit: () => void;
  onSubmitConfirmCode: (code: string) => void;
  isLoadingConfirmCode: boolean;
  onResendEmail: () => void;
  isLoadingOnResend: boolean;
  countdown: CountdownType;
  email: string;
};

export function CodeField({
  title,
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

  const onSubmit = (data: TokenConfirmationSchema) => onSubmitConfirmCode(data.code);

  return (
    <>
      <CardSummary
        title={auth.card_summary.verify_email}
        onClickEdit={onClickEdit}
        email={email}
        sx={{ mb: 6 }}
      />
      <Stack
        component="form"
        direction="column"
        gap={2}
        onSubmit={handleSubmit(onSubmit)}
      >

        <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
          {title}
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
          sx={{
            maxWidth: 400,
          }}
          inputProps={{
            maxLength: 6,
          }}
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
    </>

  );
}
