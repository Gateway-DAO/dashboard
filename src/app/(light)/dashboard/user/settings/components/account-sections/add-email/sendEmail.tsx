import { LoadingButton } from '@/components/buttons/loading-button/loading-button';
import { common } from '@/locale/en/common';
import { settings } from '@/locale/en/settings';
import { useFormContext } from 'react-hook-form';

import { Stack, TextField, Typography } from '@mui/material';

import { EmailSchema } from './schema';

type Props = {
  onSubmitSendEmail: (data: EmailSchema) => void;
  isLoading: boolean;
  disabledField: boolean;
};

export default function SendEmail({
  onSubmitSendEmail,
  isLoading,
  disabledField,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<EmailSchema>();

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmitSendEmail)} gap={3}>
      <Typography variant="h4">
        {settings.connected_accounts.add_email.title}
      </Typography>
      <TextField
        sx={{ mb: 1 }}
        variant="outlined"
        type="email"
        disabled={disabledField}
        error={!!errors?.email_address}
        helperText={errors.email_address?.message}
        {...register('email_address', { required: true })}
        placeholder={settings.connected_accounts.add_email.label}
      />
      <LoadingButton
        variant="contained"
        type="submit"
        isLoading={isLoading}
        sx={{ height: 48 }}
      >
        {common.actions.continue}
      </LoadingButton>
    </Stack>
  );
}
