'use client';
import { useSession } from 'next-auth/react';
import { ChangeEvent, useRef, useState } from 'react';

import CropImage from '@/components/crop-image/crop-image';
import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import ModalHeader from '@/components/modal/modal-header/modal-header';
import ModalRight from '@/components/modal/modal-right/modal-right';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/material';

import UploadFileArea from './upload-file-area';
import { getSignedUrl, readImageFile, saveProfilePicturew } from './utlis';

export default function EditAvatar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: session, update } = useSession();

  const [cropableImage, setCropableImage] = useState<string>();

  const { enqueueSnackbar } = useSnackbar();

  const onCloseModal = () => setCropableImage(undefined);

  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationKey: [session?.user?.did],
    mutationFn: async (blob: Blob) => {
      if (!session) {
        throw new Error('No session');
      }

      const signedUrl: string = await getSignedUrl();

      const file = new File([blob], 'profile_picture', {
        type: blob.type,
      });

      await fetch(signedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      const account = await saveProfilePicturew();

      return update(account);
    },
  });

  const onChange = (blob: Blob) => {
    mutateAsync(blob);
  };

  const onReadFile = async (files: File[] | FileList) => {
    try {
      const { image, file, isGif } = await readImageFile(files);
      if (isGif) {
        onChange(file);
        return;
      }
      setCropableImage(image);
    } catch (e) {
      let errorMessage = 'Failed to read file';
      if (e instanceof Error) {
        errorMessage = e.message;
      } else if (typeof e === 'string') {
        errorMessage = e;
      }
      enqueueSnackbar(errorMessage, { variant: 'error' });
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
          '.avater-container': {
            'svg, img': {
              transition: 'opacity 0.15s',
            },
          },
          ':hover, :focus': {
            outline: 'none',
            cursor: 'pointer',
            '.avatar-container': {
              'svg, img': {
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
        <Box
          className="avatar-container"
          sx={{
            display: 'flex',
            borderRadius: '100%',
            backgroundColor: 'primary.dark',
          }}
        >
          <GTWAvatar
            size={90}
            src={session?.user?.profile_picture}
            name={session?.user?.did}
            alt="Profile Picture"
          />
        </Box>
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
      {!isPending && <UploadFileArea onReadFile={onReadFile} />}
    </>
  );
}
