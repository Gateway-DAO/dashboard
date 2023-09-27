'use client';
import { useSession } from 'next-auth/react';

import { LoadingButton } from '@/components/buttons/loading-button/loading-button';
import useDebouncedUsernameAvaibility from '@/hooks/use-debounced-username-avaibility';
import { auth } from '@/locale/en/auth';
import { common } from '@/locale/en/common';
import { settings } from '@/locale/en/settings';
import { usernameSchema } from '@/schemas/username';
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

import { CreateProfileSchema, createProfileSchema } from '../../schema';
import useStepHandler from '../../utils/use-step-handler';
import { TitleSubtitleField } from '../title-field';

export function ChooseGatewayId() {
  const { enqueueSnackbar } = useSnackbar();
  const { data: session, update: updateSession } = useSession();
  const onHandleSuccess = useStepHandler();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<CreateProfileSchema>({
    resolver: zodResolver(createProfileSchema),
    mode: 'onChange',
  });

  const updateUser = useMutation({
    mutationKey: ['updateUser'],
    mutationFn: async (data: CreateProfileSchema) =>
      (await getClientPrivateApi()).update_user({
        username: data.username,
        displayName: data.displayName ?? null,
      }),
  });

  const {
    avaibility,
    onStartCheckAvaibility,
    onCheckAvaibility,
    onResetAvaibility,
  } = useDebouncedUsernameAvaibility();

  const onSubmit = async (data: CreateProfileSchema) => {
    if (avaibility !== 'success') return;
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
      enqueueSnackbar(auth.steps.choose_gateway_id.success, {
        variant: 'success',
      });
      await onHandleSuccess();
    } catch (error) {}
  };

  const avaibilityText =
    avaibility === 'invalid'
      ? settings.username.not_available
      : settings.username.helper;

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
                onStartCheckAvaibility();
                return onCheckAvaibility(value);
              }
              if (avaibility !== 'idle') {
                onResetAvaibility();
              }
            },
          })}
          error={!!errors.username || avaibility === 'invalid'}
          helperText={errors.username?.message ?? avaibilityText}
          InputProps={{
            startAdornment: <InputAdornment position="start">@</InputAdornment>,
            endAdornment: (
              <InputAdornment position="end">
                {avaibility === 'loading' && <CircularProgress size={16} />}
                {avaibility === 'success' && <Check color="success" />}
                {avaibility === 'invalid' && <Close color="error" />}
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
            !isValid || avaibility !== 'success' || updateUser.isSuccess
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
