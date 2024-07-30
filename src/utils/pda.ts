import { PrivateDataAsset } from '@/services/server/types';

export enum FileType {
  pda,
  image,
  video,
  audio,
  document,
  pdf,
  other,
}

export const getFileTypeByMimeType = (mimeType: string) => {
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

export const getFileTypeByPda = (pda: PrivateDataAsset) => {
  if (pda.structured || !pda.mimeType) {
    return FileType.pda;
  }

  const { mimeType } = pda;

  return getFileTypeByMimeType(mimeType);
};

export const getIconFile = (file: FileType) => {
  switch (file) {
    case FileType.audio:
      return '/images/icons/data_file_generic.svg';
    case FileType.document:
      return '/images/icons/data_file_document.svg';
    case FileType.pdf:
      return '/images/icons/data_file_pdf.svg';
    case FileType.image:
      return '/images/icons/data_file_image.svg';
    case FileType.pda:
      return '/images/icons/data_asset.svg';
    case FileType.video:
      return '/images/icons/data_file_video.svg';
    case FileType.other:
    default:
      return '/images/icons/data_file_generic.svg';
  }
};

export const getBgColorIconFile = (file: FileType) => {
  switch (file) {
    case FileType.pdf:
    case FileType.image:
    case FileType.video:
      return '#E5393516';
    case FileType.document:
    case FileType.audio:
    case FileType.other:
    default:
      return '#1E88E516';
  }
};
