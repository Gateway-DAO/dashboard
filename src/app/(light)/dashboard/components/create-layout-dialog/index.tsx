'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';

import { LoadingButton } from '@/components/buttons/loading-button/loading-button';
import AvatarPicker from '@/components/form/avatar-picker/avatar-picker';
import { TitleSubtitleField } from '@/components/title-field/title-field';
import useDebouncedUsernameAvaibility from '@/hooks/use-debounced-username-avaibility';
import { org } from '@/locale/en/org';
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
import Dialog from '@mui/material/Dialog';

import {
  CreateOrganisationSchema,
  createOrganisationSchema,
} from './components/schema';
import CreateOrgLayout from './create-org-layout';

type Props = {
  open: boolean;
  onClose: () => void;
  // setOpen: Dispatch<SetStateAction<boolean>>;
};

type UploadImageProps = {
  profilePictureUrl: Blob | null;
  org_id: string;
};

export default function CreateOrgDialog({ open, onClose }: Props) {
  const { update } = useSession();
  const { enqueueSnackbar } = useSnackbar();
  const [image, setImage] = useState<Blob | null>(null);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<CreateOrganisationSchema>({
    resolver: zodResolver(createOrganisationSchema),
    mode: 'all',
  });

  const {
    avaibility,
    onStartCheckAvaibility,
    onCheckAvaibility,
    onResetAvaibility,
  } = useDebouncedUsernameAvaibility();

  const createOrg = useMutation({
    mutationKey: ['createOrg'],
    mutationFn: async (data: CreateOrganisationSchema) =>
      (await getClientPrivateApi()).create_org({
        username: data.username,
        name: data.name,
        description: data.description,
        website: data.website || null,
      }),
    async onSuccess(data) {
      const org_id = data?.createOrganization?.id;
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

  const onSubmit = async (data: CreateOrganisationSchema) => {
    if (avaibility !== 'success') return;
    try {
      await createOrg.mutateAsync(data);
      onClose();
      enqueueSnackbar(org.success, {
        variant: 'success',
      });
      await update();
    } catch (error) {
      enqueueSnackbar(org.error, {
        variant: 'error',
      });
    }
  };

  const avaibilityText =
    avaibility === 'invalid'
      ? org.form.username.not_available
      : org.form.username.can_edit;

  return (
    <Dialog fullScreen open={open}>
      <CreateOrgLayout
        closeButonProps={{
          onClick: () => onClose(),
        }}
      >
        <Stack
          component={'form'}
          gap={4}
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
                startAdornment: (
                  <InputAdornment position="start">@</InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    {avaibility === 'loading' && <CircularProgress size={16} />}
                    {avaibility === 'success' && <Check color="success" />}
                    {avaibility === 'invalid' && <Close color="error" />}
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
            disabled={
              !isValid || avaibility !== 'success' || createOrg.isSuccess
            }
          >
            {org.btnText}
          </LoadingButton>
        </Stack>
      </CreateOrgLayout>
    </Dialog>
  );
}
