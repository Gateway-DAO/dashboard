'use client';
import { useSession } from 'next-auth/react';

import AvatarPicker from '@/components/form/avatar-picker/avatar-picker';
import { common } from '@/locale/en/common';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

import { FormControl, FormLabel } from '@mui/material';

export default function Avatar() {
  const { data: session, update } = useSession();
  const uploadImage = useMutation({
    mutationKey: ['update-avatar'],
    mutationFn: async (profilePictureUrl: Blob) => {
      const formData = new FormData();
      console.log(profilePictureUrl.toString());
      formData.append('image', profilePictureUrl!);
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

  return (
    <FormControl>
      <FormLabel htmlFor="avatar" sx={{ fontSize: 14 }}>
        {common.general.avatar}
      </FormLabel>
      <AvatarPicker
        name="profilePicture"
        id={session!.user.id!}
        username={session!.user.username!}
        onChange={onSubmit}
        isLoading={uploadImage.isLoading}
      />
    </FormControl>
  );
}
