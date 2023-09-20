'use client';
import { LoadingButton } from '@/components/buttons/loading-button/loading-button';
import { auth } from '@/locale/en/auth';
import { common } from '@/locale/en/common';
import { errorMessages } from '@/locale/en/errors';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

import { InputAdornment, Stack, TextField, Typography } from '@mui/material';

import { UsernameSchema, usernameSchema } from '../../schema';
import { TitleSubtitleField } from '../title-field';

export function ChooseGatewayId() {
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setError,
    watch
  } = useForm<UsernameSchema>({
    resolver: zodResolver(usernameSchema),
    mode: 'onChange',
  });

  const onSubmit = async ({ }: UsernameSchema) => {
    /*     try {
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
        } */
  };

  return (
    <>
      <Stack
        component="form"
        gap={2}
        direction={'column'}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography component="h2" variant="h4" sx={{ mb: 3 }}>
          {auth.steps.choose_gateway_id.title}
        </Typography>
        <Typography component="p" variant="body1" sx={{ mb: 3 }}>
          {auth.steps.choose_gateway_id.subtitle}
        </Typography>
        <TitleSubtitleField
          title={auth.steps.choose_gateway_id.create_username}
          subtitle={auth.steps.choose_gateway_id.create_username_rules}
        />
        <TextField
          required
          label={common.general.username}
          id="username"
          {...register('username')}
          error={!!errors.username}
          helperText={
            errors.username?.message
          }
          InputProps={{
            startAdornment: <InputAdornment position="start">@</InputAdornment>,
          }}
        />
        <TitleSubtitleField
          title={auth.steps.choose_gateway_id.create_display_name}
          subtitle={auth.steps.choose_gateway_id.create_display_name_rules}
        />
        <TextField
          required
          label={common.general.name}
          id="displayName"
          {...register('displayName')}
          error={!!errors.displayName}
          helperText={
            errors.displayName?.message ??
            common.general.optional
          }
        />
        <LoadingButton
          variant="contained"
          type="submit"
          sx={{ mt: 2, height: 48 }}
          isLoading={false}
          disabled={!isValid}
        >
          {common.actions.create_id}
        </LoadingButton>
      </Stack>
    </>
  );
}
