export const readImageFile = (files: FileList | File[]) => {
  const reader = new FileReader();
  const file = files[0];
  const imageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

  return new Promise<{ image: string; file: Blob; isGif: boolean }>(
    (resolve, reject) => {
      if (!imageTypes.includes(file.type)) {
        return reject('Only JPG,PNG,GIF,SVG are allowed');
      }
      if (file.size > 5245329) {
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
