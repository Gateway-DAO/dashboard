'use client';
import { useSession } from 'next-auth/react';

import { LoadingButton } from '@/components/buttons/loading-button/loading-button';
import { TitleSubtitleField } from '@/components/title-field/title-field';
import useDebouncedUsernameAvailability from '@/hooks/use-debounced-username-avaibility';
import useGaEvent from '@/hooks/use-ga-event';
import { auth } from '@/locale/en/auth';
import { common } from '@/locale/en/common';
import { settings } from '@/locale/en/settings';
import { usernameSchema } from '@/schemas/profile';
import { getClientPrivateApi } from '@/services/protocol/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

import { Check, Close } from '@mui/icons-material';
import {
  CircularProgress,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import useLoginStepHandler from '../../providers/step-provider/use-login-step-handler';
import { CreateProfileSchema, createProfileSchema } from '../../schema';

export function ChooseGatewayId() {
  const { enqueueSnackbar } = useSnackbar();
  const { data: session, update: updateSession } = useSession();
  const onHandleSuccess = useLoginStepHandler();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<CreateProfileSchema>({
    resolver: zodResolver(createProfileSchema as any), // TODO: Add a right types
    mode: 'onChange',
  });
  const { sendEvent } = useGaEvent();

  const updateUser = useMutation({
    mutationKey: ['updateUser'],
    mutationFn: async (data: CreateProfileSchema) =>
      (await getClientPrivateApi()).update_user({
        username: data.username,
        displayName: data.displayName ?? null,
        profilePicture: null,
      }),
  });

  const {
    availability,
    onStartCheckAvailability,
    onCheckAvailability,
    onResetAvailability,
  } = useDebouncedUsernameAvailability();

  const onSubmit = async (data: CreateProfileSchema) => {
    if (availability !== 'success') return;
    try {
      const {
        updateUser: { displayName, gatewayId },
      } = await updateUser.mutateAsync(data);
      await updateSession({
        ...session,
        user: {
          ...session!.user,
          username: gatewayId,
          displayName: displayName,
        },
      });
      sendEvent('user_signup');
      enqueueSnackbar(auth.steps.choose_gateway_id.success, {
        variant: 'success',
      });
      await onHandleSuccess();
    } catch (error) {}
  };

  const avaibilityText =
    availability === 'invalid'
      ? settings.username.not_available
      : settings.username.can_edit;

  return (
    <>
      <Stack
        component="form"
        gap={2}
        direction={'column'}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography
          id="title-choose-gateway-id"
          component="h2"
          variant="h4"
          sx={{ mb: 3 }}
        >
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
          {...register('username', {
            onChange(event) {
              const value = event.target.value;
              const { success } = usernameSchema.safeParse(value);
              if (success) {
                onStartCheckAvailability();
                return onCheckAvailability(value);
              }
              if (availability !== 'idle') {
                onResetAvailability();
              }
            },
          })}
          error={!!errors.username || availability === 'invalid'}
          helperText={errors.username?.message ?? avaibilityText}
          InputProps={{
            startAdornment: <InputAdornment position="start">@</InputAdornment>,
            endAdornment: (
              <InputAdornment position="end">
                {availability === 'loading' && <CircularProgress size={16} />}
                {availability === 'success' && <Check color="success" />}
                {availability === 'invalid' && <Close color="error" />}
              </InputAdornment>
            ),
          }}
          disabled={updateUser.isSuccess}
        />
        <TitleSubtitleField
          title={auth.steps.choose_gateway_id.create_display_name}
          subtitle={auth.steps.choose_gateway_id.create_display_name_rules}
        />
        <TextField
          label={common.general.name}
          id="displayName"
          {...register('displayName')}
          error={!!errors.displayName}
          helperText={errors.displayName?.message ?? common.general.optional}
          disabled={updateUser.isSuccess}
        />
        <LoadingButton
          variant="contained"
          type="submit"
          sx={{ mt: 2, height: 48 }}
          isLoading={updateUser.isLoading}
          disabled={
            !isValid || availability !== 'success' || updateUser.isSuccess
          }
        >
          {updateUser.isSuccess
            ? common.general.success
            : common.actions.create_id}
        </LoadingButton>
      </Stack>
    </>
  );
}
