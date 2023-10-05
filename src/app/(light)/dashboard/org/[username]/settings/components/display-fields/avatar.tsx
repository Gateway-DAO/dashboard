'use client';
import { useSession } from 'next-auth/react';

import AvatarPicker from '@/components/form/avatar-picker/avatar-picker';
import useOrganization from '@/hooks/use-organization';
import { common } from '@/locale/en/common';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

import { FormControl, FormLabel } from '@mui/material';

export default function Avatar() {
  const { update } = useSession();
  const { organization } = useOrganization();
  const uploadImage = useMutation({
    mutationKey: ['update-avatar'],
    mutationFn: async (profilePictureUrl: Blob) => {
      const formData = new FormData();
      formData.append('image', profilePictureUrl!);
      formData.append('organization', organization?.id ?? '');
      return fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });
    },
  });

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (profilePicture: Blob) => {
    try {
      await uploadImage.mutateAsync(profilePicture);
      await update();
    } catch {
      enqueueSnackbar('Failed to update avatar', { variant: 'error' });
    }
  };

  const initialImage = organization?.image ?? '';

  return (
    <FormControl>
      <FormLabel htmlFor="avatar" sx={{ fontSize: 14 }}>
        {common.general.avatar}
      </FormLabel>
      <AvatarPicker
        name="profilePicture"
        username={organization!.gatewayId!}
        value={initialImage}
        onChange={onSubmit}
        isLoading={uploadImage.isLoading}
      />
    </FormControl>
  );
}
