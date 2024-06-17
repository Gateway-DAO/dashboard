import { ChangeEvent, forwardRef, Ref } from 'react';

import { Button } from '@mui/material';
import { pdas as pdasLocales } from '@/locale/en/pda';
import AddIcon from '@mui/icons-material/Add';
import { readUploadedFile } from './utils';

type FileErrorProps = {
  title: string;
  description: string;
};

type Props = {
  currentUserStorage: number;
  onFileUpload: (files: Blob[]) => void;
  onError: (error: FileErrorProps) => void;
};

function FilePickerField(
  { currentUserStorage, onError, onFileUpload }: Props,
  ref: Ref<HTMLInputElement>
) {
  const onReadFile = async (uploadedFiles: File[] | FileList) => {
    try {
      const { files } = await readUploadedFile(
        uploadedFiles,
        currentUserStorage
      );
      onFileUpload(files);
    } catch (e: any) {
      console.error(e);
      onError(e);
    }
  };

  const onSelectFile = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return;
    }
    onReadFile(event.target.files);
  };

  return (
    <Button variant="contained" size="large" startIcon={<AddIcon />}>
      {pdasLocales.upload_file}
      <input
        id={'file'}
        type="file"
        ref={ref}
        name={'file'}
        onChange={onSelectFile}
      />
    </Button>
  );
}

const FilePicker = forwardRef(FilePickerField);

export default FilePicker;
