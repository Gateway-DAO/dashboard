'use client';
import { useSession } from 'next-auth/react';
import { ChangeEvent, useRef, useState } from 'react';

import CropImage from '@/components/crop-image/crop-image';
import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import ModalHeader from '@/components/modal/modal-header/modal-header';
import ModalRight from '@/components/modal/modal-right/modal-right';
import useDropArea from '@/hooks/use-drop-area/use-drop-area';
import { brandColors } from '@/theme/config/brand';
import { useMutation } from '@tanstack/react-query';

import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Box, IconButton } from '@mui/material';

import UploadFileArea from './upload-file-area';
import { readImageFile } from './utlis';

export default function EditAvatar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();

  const [cropableImage, setCropableImage] = useState<string>();

  const onCloseModal = () => setCropableImage(undefined);

  const onChange = (file: Blob) => {};

  const { mutateAsync } = useMutation({
    mutationKey: [session?.user?.did],
    mutationFn: async () => {
      const response = await fetch('/api/user/profile-picture', {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    },
  });

  const onReadFile = async (files: File[] | FileList) => {
    try {
      const { image, file, isGif } = await readImageFile(files);
      if (isGif) {
        onChange(file);
        return;
      }
      setCropableImage(image);
    } catch (e) {
      console.error(e);
    }
  };

  const onFocus = () => {
    inputRef.current?.click();
  };

  const onSelectFile = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return;
    }
    onReadFile(event.target.files);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const onCrop = (image: Blob) => {
    onChange(image);
    onCloseModal();
  };

  return (
    <>
      <Box
        role="button"
        tabIndex={0}
        onClick={() => onFocus()}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: 'fit-content',
          ':hover, :focus': {
            outline: 'none',
            cursor: 'pointer',
            '.MuiAvatar-root': {
              '.MuiAvatar-img': {
                opacity: 0.7,
              },
            },
            '.edit-avatar-button': {
              boxShadow: `0 0 0 15px rgba(0,0,0,.5) inset`,
              '.MuiSvgIcon-root': {
                opacity: 0.7,
              },
            },
          },
        }}
      >
        <Avatar
          alt="Edit Picture"
          src={'/social.png'}
          sx={{
            width: 90,
            height: 90,
            background: 'black',
            '.MuiAvatar-img': {
              transition: 'opacity 0.15s',
            },
          }}
        />
        <Box
          className="edit-avatar-button"
          sx={{
            backgroundColor: 'primary.dark',
            zIndex: 10,
            ml: -2,
            borderRadius: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 32,
            height: 32,
            transition: 'box-shadow 0.15s',
          }}
        >
          <EditIcon
            htmlColor="#fff"
            fontSize="small"
            sx={{
              transition: 'opacity 0.15s',
            }}
          />
          <Box
            component="input"
            type="file"
            ref={inputRef}
            onChange={onSelectFile}
            accept="image/*"
            tabIndex={-1}
            style={{
              visibility: 'hidden',
              width: 0,
              height: 0,
              position: 'absolute',
            }}
          />
        </Box>
      </Box>
      <ModalRight open={!!cropableImage} onClose={onCloseModal}>
        <ModalHeader onClose={onCloseModal}></ModalHeader>
        {!!cropableImage && (
          <CropImage
            image={cropableImage}
            onClose={onCloseModal}
            onSubmit={onCrop}
          />
        )}
      </ModalRight>
      <UploadFileArea onReadFile={onReadFile} />
    </>
  );
}
