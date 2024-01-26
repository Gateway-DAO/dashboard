'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next-nprogress-bar';
import { useState } from 'react';

import { LoadingButton } from '@/components/buttons/loading-button/loading-button';
import AvatarPicker from '@/components/form/avatar-picker/avatar-picker';
import { TitleSubtitleField } from '@/components/title-field/title-field';
import { mutations } from '@/constants/queries';
import routes from '@/constants/routes';
import { useGtwSession } from '@/context/gtw-session-provider';
import useDebouncedUsernameAvailability from '@/hooks/use-debounced-username-avaibility';
import useGaEvent from '@/hooks/use-ga-event';
import { org } from '@/locale/en/org';
import { usernameSchema } from '@/schemas/profile';
import { getClientPrivateApi } from '@/services/protocol/api';
import { currentEnv } from '@/utils/env';
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

import { CreateOrganizationSchema, createOrganizationSchema } from './schema';

type UploadImageProps = {
  profilePictureUrl: Blob | null;
  org_id: string;
};

export default function CreateOrgStructure() {
  const { update } = useSession();
  const { session } = useGtwSession();
  const { sendEvent } = useGaEvent();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [image, setImage] = useState<Blob | null>(null);
  const isTestnet = currentEnv === 'testnet';

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<CreateOrganizationSchema>({
    resolver: zodResolver(createOrganizationSchema),
    mode: 'all',
  });

  const {
    availability,
    onStartCheckAvailability,
    onCheckAvailability,
    onResetAvailability,
  } = useDebouncedUsernameAvailability();

  const createOrg = useMutation({
    mutationKey: ['createOrg'],
    mutationFn: async (data: CreateOrganizationSchema) =>
      (await getClientPrivateApi()).create_org({
        username: data.username,
        name: data.name,
        description: data.description,
        website: data.website || null,
      }),
    async onSuccess(data) {
      const org_id = data?.createOrganization?.id;
      if (isTestnet) {
        try {
          await createOrgKey.mutateAsync({
            orgId: org_id,
            session: session.token,
          });
        } catch (error) {
          enqueueSnackbar('Failed to create key', { variant: 'error' });
        }
      }
      if (image) {
        try {
          await uploadImage.mutateAsync({
            profilePictureUrl: image,
            org_id,
          });
        } catch (error) {
          enqueueSnackbar('Failed to update avatar', { variant: 'error' });
        }
      }
    },
  });

  const createOrgKey = useMutation({
    mutationKey: [mutations.create_org_key],
    mutationFn: async ({
      orgId,
      session,
    }: {
      orgId: string;
      session: string;
    }) => {
      const response = await fetch('/api/org-widget-key/generate', {
        method: 'POST',
        body: JSON.stringify({ session, orgId }),
      });
      const data = await response.json();
      if (!data) {
        throw new Error('Failed to create key');
      }
      return data;
    },
  });

  const uploadImage = useMutation({
    mutationKey: ['upload-org-avatar'],
    mutationFn: async ({ profilePictureUrl, org_id }: UploadImageProps) => {
      const formData = new FormData();
      formData.append('image', profilePictureUrl!);
      formData.append('organization', org_id ?? '');
      return fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });
    },
  });

  const onSubmit = async (data: CreateOrganizationSchema) => {
    if (availability !== 'success') return;
    try {
      await createOrg.mutateAsync(data);
      sendEvent('create_org');
      enqueueSnackbar(org.success, {
        variant: 'success',
      });
      await update();
      router.push(routes.dashboard.org.home(data.username));
    } catch (error) {
      enqueueSnackbar(org.error, {
        variant: 'error',
      });
    }
  };

  const availabilityText =
    availability === 'invalid'
      ? org.form.username.not_available
      : org.form.username.can_edit;
  return (
    <Stack
      component={'form'}
      gap={4}
      pb={8}
      direction={'column'}
      onSubmit={handleSubmit(onSubmit)}
    >
      <>
        <Typography variant="h3">{org.main.title}</Typography>
        <Typography variant="body1" gutterBottom>
          {org.main.desc}
        </Typography>
      </>
      <Stack gap={3} direction={'column'}>
        <TitleSubtitleField
          title={org.form.username.label}
          subtitle={org.form.username.desc}
        />
        <TextField
          label={org.form.username.inputLabel}
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
          helperText={errors.username?.message ?? availabilityText}
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
          disabled={createOrg.isSuccess}
        />
      </Stack>
      <Stack gap={3} direction={'column'}>
        <TitleSubtitleField
          title={org.form.org.label}
          subtitle={org.form.org.desc}
        />
        <TextField
          id="name"
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
          disabled={createOrg.isSuccess}
        />
      </Stack>
      <Stack gap={3} direction={'column'}>
        <TitleSubtitleField
          title={org.form.avatar.label}
          subtitle={org.form.avatar.desc}
        />
        <AvatarPicker
          name="orgPicture"
          id={'org'}
          value={image ? URL.createObjectURL(image) : ''}
          username={'uploadOrgAvatar' ?? ''}
          onChange={(blob: Blob) => {
            setImage(blob);
          }}
        />
      </Stack>
      <Stack gap={3} direction={'column'}>
        <TitleSubtitleField
          title={org.form.description.label}
          subtitle={org.form.description.desc}
        />
        <TextField
          id="description"
          {...register('description')}
          multiline
          error={!!errors.description}
          helperText={errors.description?.message}
          disabled={createOrg.isSuccess}
          type="text"
          rows={3}
        />
      </Stack>

      <Stack gap={3} direction={'column'}>
        <TitleSubtitleField
          title={org.form.website.label}
          subtitle={org.form.website.desc}
        />
        <TextField
          id="website"
          {...register('website')}
          error={!!errors.website}
          helperText={errors.website?.message}
          disabled={createOrg.isSuccess}
        />
      </Stack>
      <LoadingButton
        variant="contained"
        type="submit"
        size="large"
        isLoading={createOrg.isLoading}
        disabled={!isValid || availability !== 'success' || createOrg.isSuccess}
      >
        {org.btnText}
      </LoadingButton>
    </Stack>
  );
}
