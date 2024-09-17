import { Account } from '@/services/api/models';

export const readImageFile = (files: FileList | File[]) => {
  const reader = new FileReader();
  const file = files[0];
  const imageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

  return new Promise<{ image: string; file: Blob; isGif: boolean }>(
    (resolve, reject) => {
      if (!file) {
        return reject('No file selected');
      }
      if (!imageTypes.includes(file.type)) {
        return reject('Only JPG,PNG,GIF,SVG are allowed');
      }
      if (file.size > 5245329 && file.type.includes('gif')) {
        return reject('File size should be less than 5 mb');
      }
      reader.onload = (event) => {
        const image = event.target!.result as string;
        const isGif = !!image.toString().match('data:image/gif;');
        resolve({ image, file, isGif });
      };

      reader.readAsDataURL(file);
    }
  );
};

export const getSignedUrl = async () => {
  const response = await fetch('/api/user/profile-picture', {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const signedUrl: string = await response.json();
  return signedUrl;
};

export const saveProfilePicture = async () => {
  const response = await fetch('/api/user/profile-picture', {
    method: 'PATCH',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const newAccount: Account = await response.json();
  return newAccount;
};
