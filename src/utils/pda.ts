import { PrivateDataAsset } from '@/services/protocol-v3/types';

export enum FileType {
  pda,
  image,
  video,
  audio,
  document,
  pdf,
  other,
}

export const getFileTypeByMime = (pda: PrivateDataAsset) => {
  if (pda.structured || !pda.mimeType) {
    return FileType.pda;
  }

  const { mimeType } = pda;

  if (mimeType.includes('audio')) {
    return FileType.audio;
  } else if (mimeType.includes('image')) {
    return FileType.image;
  } else if (mimeType.includes('video')) {
    return FileType.video;
  } else if (mimeType.includes('pdf')) {
    return FileType.pdf;
  } else if (mimeType.includes('document') || mimeType.includes('doc')) {
    return FileType.document;
  } else {
    return FileType.other;
  }
};

export const getIconFile = (file: FileType) => {
  switch (file) {
    case FileType.audio:
      return '/images/data_file_generic.svg';
    case FileType.document:
      return '/images/data_file_document.svg';
    case FileType.pdf:
      return '/images/data_file_pdf.svg';
    case FileType.image:
      return '/images/data_file_image.svg';
    case FileType.pda:
      return '/images/data_asset.svg';
    case FileType.video:
      return '/images/data_file_video.svg';
    case FileType.other:
    default:
      return '/images/data_file_generic.svg';
  }
};
