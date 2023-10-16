'use client';
import { ChangeEvent, Ref, forwardRef, useState } from 'react';

import { LoadingButton } from '@/components/buttons/loading-button/loading-button';
import useDropArea from '@/hooks/use-drop-area/use-drop-area';

import { Box, Dialog, Stack } from '@mui/material';

import CropDialog from '../../crop-dialog/crop-dialog';
import GTWAvatar from '../../gtw-avatar/gtw-avatar';
import { readImageFile } from './utils';

type Props = {
  id: string;
  name: string;
  username: string;
  value?: string | null;
  isLoading?: boolean;
  onChange: (image: Blob) => void;
};

// TOOD: Reset when user selected an image

function AvatarPickerField(
  { name, username, value, onChange, isLoading, id }: Props,
  ref: Ref<HTMLInputElement>
) {
  const [cropableImage, setCropableImage] = useState<string>();

  const onCloseModal = () => setCropableImage(undefined);

  const onReadFile = async (files: File[] | FileList) => {
    try {
      const { image, file, isGif } = await readImageFile(files);
      if (isGif) {
        onChange(file);
        return;
      }
      setCropableImage(image);
    } catch (e) {
      //TODO: Show error
      console.error(e);
    }
  };

  const onSelectFile = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return;
    }
    onReadFile(event.target.files);
  };

  const onCrop = (image: Blob) => {
    onChange(image);
    onCloseModal();
  };

  const [_dropBond, { over: _isOver }] = useDropArea({
    onFiles: onReadFile,
  });

  return (
    <>
      <Stack
        component="label"
        direction="row"
        gap={2}
        alignItems="center"
        sx={{
          pt: 1,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: 'transparent',
        }}
      >
        <Box component="span" sx={{ cursor: 'pointer' }}>
          <GTWAvatar alt={username} name={id} src={value} size={80} />
        </Box>
        <LoadingButton
          size="small"
          variant="outlined"
          component="span"
          isLoading={isLoading}
        >
          Change Image
          <input
            id={name}
            type="file"
            hidden
            ref={ref}
            name={name}
            onChange={onSelectFile}
            tabIndex={-1}
            accept="image/*"
          />
        </LoadingButton>
      </Stack>
      <Dialog open={!!cropableImage} onClose={onCloseModal} fullWidth>
        {!!cropableImage && (
          <CropDialog
            image={cropableImage}
            onClose={onCloseModal}
            onSubmit={onCrop}
          />
        )}
      </Dialog>
    </>
  );
}

const AvatarPicker = forwardRef(AvatarPickerField);

export default AvatarPicker;
