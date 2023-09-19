"use client";
import { ChangeEvent, Ref, forwardRef, useState } from 'react';

import useDropArea from '@/hooks/use-drop-area/use-drop-area';

import { Box, Button, Dialog, Stack } from '@mui/material';

import CropDialog from '../../crop-dialog/crop-dialog';
import GTWAvatar from '../../gtw-avatar/gtw-avatar';
import { readImageFile } from './utils';

type Props = {
  name: string;
  username: string;
  value?: string | null;
  onChange: (image: string) => void;
  onRemove?: () => void;
}

// TOOD: Reset when user selected an image

function AvatarPickerField({ name, username, value, onChange, onRemove }: Props, ref: Ref<HTMLInputElement>) {
  const [cropableImage, setCropableImage] = useState<string>()

  const onCloseModal = () => setCropableImage(undefined);

  const onReadFile = async (files: File[] | FileList) => {
    try {
      const { image, isGif } = await readImageFile(files);
      if (isGif) {
        onChange(image);
        return;
      }
      setCropableImage(image);
    } catch (e) {
      //TODO: Show error
      console.error(e);
    }
  }

  const onSelectFile = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return;
    }
    onReadFile(event.target.files);
  };

  const onCrop = (image: string) => {
    onChange(image);
    onCloseModal();
  };

  const [dropBond, { over: isOver }] = useDropArea({
    onFiles: onReadFile,
  });

  return (
    <>
      <Stack component="label" direction="row" gap={2} alignItems="center" sx={{ pt: 1, borderWidth: 1, borderStyle: "solid", borderColor: "transparent" }}>
        <Box component="span" sx={{ cursor: "pointer" }}>
          <GTWAvatar name={username} src={value} size={80} />
        </Box>
        <Stack direction="row" gap={1} alignItems="center">
          <Button size="small" variant="outlined" component="span">
            Change Image
            <input id={name} type="file" hidden ref={ref} name={name} onChange={onSelectFile}
              tabIndex={-1}
              accept="image/*"
            />
          </Button>
          {!!value && !!onRemove && <Button type="button" size="small" variant="outlined" color="inherit" onClick={onRemove}>
            Remove
          </Button>}
        </Stack>
      </Stack>
      <Dialog open={!!cropableImage} onClose={onCloseModal} fullWidth>
        {!!cropableImage && <CropDialog image={cropableImage} onClose={onCloseModal} onSubmit={onCrop} />}
      </Dialog>
    </>
  )
}

const AvatarPicker = forwardRef(AvatarPickerField);

export default AvatarPicker;
