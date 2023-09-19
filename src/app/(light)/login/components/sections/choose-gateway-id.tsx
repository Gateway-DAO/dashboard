'use client';
import { LoadingButton } from '@/components/buttons/loading-button/loading-button';
import { auth } from '@/locale/en/auth';
import { errorMessages } from '@/locale/en/errors';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

import { Stack, TextField, Typography } from '@mui/material';

import { GatewayIdSchema } from '../../schema';
import { TitleSubtitleField } from '../title-field';

export function ChooseGatewayId() {
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<GatewayIdSchema>();

  const onSubmit = async ({ gatewayId }: GatewayIdSchema) => {
    try {
      console.log('test', gatewayId);
    } catch (e) {
      (e as any)?.response?.errors?.forEach(({ message }: any) => {
        if (message.indexOf(`You don't own the gatewayId`) > -1) {
          message = 'GATEWAY_ID_ALREADY_REGISTERED';
          setError('gatewayId', {
            type: 'manual',
            message: errorMessages.GATEWAY_ID_ALREADY_REGISTERED,
          });
        } else {
          enqueueSnackbar(
            errorMessages[message as keyof typeof errorMessages] ||
            errorMessages.UNEXPECTED_ERROR,
            {
              variant: 'error',
            }
          );
        }
      });
    }
  };

  return (
    <>
      <Stack
        component="form"
        gap={2}
        direction={'column'}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
          {auth.steps.choose_gateway_id.title}
        </Typography>
        <TitleSubtitleField
          title={auth.steps.choose_gateway_id.title_send_email}
          subtitle={auth.steps.choose_gateway_id.caption_send_email}
        />
        <TextField
          required
          label={auth.steps.choose_gateway_id.label}
          id="gatewayId"
          {...register('gatewayId')}
          error={!!errors.gatewayId}
          helperText={
            errors.gatewayId?.message ??
            auth.steps.choose_gateway_id.helper_text
          }
        />

        <LoadingButton
          variant="contained"
          type="submit"
          sx={{ mt: 2, height: 48 }}
          isLoading={false}
        >
          {auth.steps.choose_gateway_id.btn}
        </LoadingButton>
      </Stack>
    </>
  );
}
