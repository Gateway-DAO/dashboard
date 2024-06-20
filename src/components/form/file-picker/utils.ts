import { FileType } from '@/app/(light)/dashboard/user/assets/page';
import {
  MAX_FILE_UPLOAD_SIZE,
  MAX_FILE_USER_STORAGE,
} from '@/constants/file-upload';

export const readUploadedFile = (
  files: FileList | File[],
  currentUserStorage: number
) => {
  const file = files[0];
  return new Promise<{ files: FileType[]; title: string; description: string }>(
    (resolve, reject) => {
      if (file.size > MAX_FILE_UPLOAD_SIZE)
        resolve({
          title: 'Limit Excedded',
          description:
            'For now, only files up to 30 MB are allowed to be uploaded.',
          files: [
            {
              file,
              done: false,
              error: true,
              pending: false,
              uploading: false,
            },
          ],
        });

      if (file.size + currentUserStorage >= MAX_FILE_USER_STORAGE)
        resolve({
          title: 'Insufficient Storage',
          description: `You don't have enough storage to upload.`,
          files: [
            {
              file,
              done: false,
              error: true,
              pending: false,
              uploading: false,
            },
          ],
        });
      console.log('s');

      resolve({
        files: [
          {
            file,
            done: false,
            error: false,
            pending: false,
            uploading: false,
          },
        ],
        title: '',
        description: '',
      });
    }
  );
};
