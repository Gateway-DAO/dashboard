import { BaseSyntheticEvent, ChangeEvent, forwardRef, Ref } from 'react';

import { Button } from '@mui/material';
import { pdas as pdasLocales } from '@/locale/en/pda';
import AddIcon from '@mui/icons-material/Add';
import { readUploadedFile } from './utils';
import { NextState } from '@react-hookz/web/cjs/util/resolveHookState';
import { FileType } from '@/app/(light)/dashboard/user/assets/page';

type FileErrorProps = {
  title: string;
  description: string;
};

type Props = {
  currentUserStorage: number;
  onFileUpload: (files: FileType[]) => void;
  onError: (error: FileErrorProps) => void;
  toggle: (nextState?: NextState<boolean> | BaseSyntheticEvent) => void;
};

function FilePickerField(
  { currentUserStorage, onError, onFileUpload, toggle }: Props,
  ref: Ref<HTMLInputElement>
) {
  const onReadFile = async (uploadedFiles: File[] | FileList) => {
    try {
      const { files, title, description } = await readUploadedFile(
        uploadedFiles,
        currentUserStorage
      );
      toggle(true);
      onFileUpload(files);
      if (title.length > 0) onError({ description, title });
    } catch (e: any) {
      console.error(e);
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
