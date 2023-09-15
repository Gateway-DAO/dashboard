"use client";
import { ChangeEvent, useRef, useState } from 'react';

import useDropArea from '@/hooks/use-drop-area/use-drop-area';
import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form';

import { Box, Button, Dialog, Stack } from '@mui/material';

import CropDialog from '../../crop-dialog/crop-dialog';
import GTWAvatar from '../../gtw-avatar/gtw-avatar';
import { readImageFile } from './utils';

type Props = {
  username: string;
}

// TOOD: Reset when user selected an image

export default function AvatarPicker<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ name, control, username }: UseControllerProps<TFieldValues, TName> & Props) {
  const { field, fieldState, formState } = useController({
    name,
    control,
  })

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [cropableImage, setCropableImage] = useState<string>()

  const onCloseModal = () => setCropableImage(undefined);

  const onReadFile = async (files: File[] | FileList) => {
    try {
      const { image, isGif } = await readImageFile(files);
      if (isGif) {
        field.onChange(image);
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
    field.onChange(image);
    onCloseModal();
  };

  const [dropBond, { over: isOver }] = useDropArea({
    onFiles: onReadFile,
  });

  return (
    <>
      <Stack component="label" direction="row" gap={2} alignItems="center" sx={{ pt: 1, borderWidth: 1, borderStyle: "solid", borderColor: "transparent" }}>
        <Box component="span" sx={{ cursor: "pointer" }}>
          <GTWAvatar name={username} src={field.value} size={80} />
        </Box>
        <Button size="small" variant="outlined" component="span" sx={{ minWidth: 0 }}>
          Change Image
          <input id={name} type="file" hidden ref={(el) => {
            field.ref(el);
            inputRef.current = el;
          }} name={field.name} onChange={onSelectFile}
            tabIndex={-1}
            accept="image/*"
          />
        </Button>
      </Stack>
      <Dialog open={!!cropableImage} onClose={onCloseModal} fullWidth>
        {!!cropableImage && <CropDialog image={cropableImage} onClose={onCloseModal} onSubmit={onCrop} />}
      </Dialog>
    </>
  )
}
