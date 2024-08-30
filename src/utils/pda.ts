import { PublicDataAsset } from '@/services/api/models';

export enum FileType {
  pda,
  image,
  video,
  audio,
  document,
  pdf,
  other,
}

export const getFileTypeByMimeType = (type: PublicDataAsset['type']) => {
  if (type?.includes('audio')) {
    return FileType?.audio;
  } else if (type?.includes('image')) {
    return FileType?.image;
  } else if (type?.includes('video')) {
    return FileType?.video;
  } else if (type?.includes('pdf')) {
    return FileType?.pdf;
  } else if (type?.includes('document') || type?.includes('doc')) {
    return FileType.document;
  } else {
    return FileType.other;
  }
};

export const getFileTypeByPda = (pda: PublicDataAsset) => {
  const { type } = pda;

  if (type === 'structured') {
    return FileType.pda;
  }

  return getFileTypeByMimeType(type);
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
