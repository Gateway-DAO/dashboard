import {
  MAX_FILE_UPLOAD_SIZE,
  MAX_FILE_USER_STORAGE,
} from '@/constants/file-upload';

export const readUploadedFile = (
  files: FileList | File[],
  currentUserStorage: number
) => {
  const reader = new FileReader();
  const file = files[0];
  return new Promise<{ files: Blob[] }>((resolve, reject) => {
    if (file.size > MAX_FILE_UPLOAD_SIZE)
      reject({
        title: 'Limit Excedded',
        description:
          'For now, only files up to 30 MB are allowed to be uploaded.',
      });

    if (file.size + currentUserStorage >= MAX_FILE_USER_STORAGE)
      reject({
        title: 'Insufficient Storage',
        description: `You don't have enough storage to upload.`,
      });
    console.log('s');

    resolve({ files: [file] });
  });
};
