import { ChangeEvent, forwardRef, useRef, useState } from 'react';

import CropImage from '@/components/crop-image/crop-image';
import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import ModalHeader from '@/components/modal/modal-header/modal-header';
import ModalRight from '@/components/modal/modal-right/modal-right';
import useDropArea from '@/hooks/use-drop-area/use-drop-area';

import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton } from '@mui/material';

import { HiddenInput } from './styles';
import { readImageFile } from './utlis';

type Props = {
  id: string;
  name: string;
  alt?: string;
  value?: string | null;
  isLoading?: boolean;
  onChange: (image: Blob) => void;
};

function EditAvatarField({ onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

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
      console.error(e);
    }
  };

  const onFocus = () => {
    inputRef.current?.click();
  };

  // const onReset = () => {
  //   onChange('');
  // };

  // const onCrop = (image: string) => {
  //   onChange(image);
  //   imageCropDialog.onClose();
  // };

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

  const [_dropBond, { over: _isOver }] = useDropArea({
    onFiles: onReadFile,
  });
  return (
    <>
      <Box>
        <GTWAvatar alt="Edit Picture" src={'/social.png'} size={90} />
        <IconButton
          sx={{
            position: 'relative',
            top: -60,
            left: 75,
            backgroundColor: 'primary.dark',
            zIndex: 10,
          }}
          size="small"
          onClick={() => onFocus()}
        >
          <EditIcon htmlColor="#fff" fontSize="small" />
          <HiddenInput
            type="file"
            // ref={(el) => {
            //   // ref(el);
            //   inputRef.current = el;
            // }}
            ref={inputRef}
            onChange={onSelectFile}
            accept="image/*"
            tabIndex={-1}
          />
        </IconButton>
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
    </>
  );
}

const EditAvatar = forwardRef(EditAvatarField);

export default EditAvatar;
