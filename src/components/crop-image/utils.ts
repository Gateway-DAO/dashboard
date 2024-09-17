import type { Area } from 'react-easy-crop';

/* Copied from react-easy-crop example: <https://codesandbox.io/s/q8q1mnr01w?file=/src/cropImage.js> */

export const createImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = src;
  });

export function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180;
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
export function rotateSize(width: number, height: number, rotation: number) {
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

export default async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area,
  rotation = 0,
  flip = { horizontal: false, vertical: false },
  maxSize = 200
): Promise<Blob> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  const rotRad = getRadianAngle(rotation);

  // calculate bounding box of the rotated image
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation
  );

  // set canvas size to match the bounding box
  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  // translate canvas context to a central location to allow rotating and flipping around the center
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-image.width / 2, -image.height / 2);

  // draw rotated image
  ctx.drawImage(image, 0, 0);

  // croppedAreaPixels values are bounding box relative
  // extract the cropped image using these values
  const data = ctx.getImageData(
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height
  );

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // paste generated rotate image at the top left corner
  ctx.putImageData(data, 0, 0);

  // Resize if larger than maxSizexmaxSize
  if (canvas.width > maxSize || canvas.height > maxSize) {
    const resizeCanvas = document.createElement('canvas');
    const resizeCtx = resizeCanvas.getContext('2d')!;

    // Set fixed size to maxSizexmaxSize
    resizeCanvas.width = maxSize;
    resizeCanvas.height = maxSize;

    // Draw resized image
    resizeCtx.drawImage(
      canvas,
      0,
      0,
      canvas.width,
      canvas.height,
      0,
      0,
      maxSize,
      maxSize
    );

    // Replace the original canvas with the resized one
    canvas.width = maxSize;
    canvas.height = maxSize;
    ctx.drawImage(resizeCanvas, 0, 0);
  }

  // As a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob((file) => {
      if (!file) return reject('Failed to crop image');
      // resolve(URL.createObjectURL(file));
      resolve(file);
    }, 'image/jpeg');
  });
}
