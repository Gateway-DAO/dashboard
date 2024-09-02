import { FunctionComponent } from 'react';

import DocIcon from '@/components/icons/pda/doc';
import GenericIcon from '@/components/icons/pda/generic';
import ImageIcon from '@/components/icons/pda/image';
import PDFIcon from '@/components/icons/pda/pdf';
import StructuredIcon from '@/components/icons/pda/structured';
import VideoIcon from '@/components/icons/pda/video';
import { PublicDataAsset } from '@/services/api/models';

import { SvgIconProps } from '@mui/material';

export enum FileType {
  structured,
  image,
  video,
  document,
  pdf,
  other,
}

export const getFileTypeByMimeType = (type: PublicDataAsset['type']) => {
  if (type === 'Structured Data') {
    return FileType.structured;
  } else if (type?.includes('image')) {
    return FileType?.image;
  } else if (type?.includes('video')) {
    return FileType?.video;
  } else if (type?.includes('pdf')) {
    return FileType?.pdf;
  } else if (
    type?.includes('officedocument.wordprocessingml') ||
    type?.includes('msword') ||
    type?.includes('opendocument.text') ||
    type?.includes('text') ||
    type?.includes('rtf')
  ) {
    return FileType.document;
  } else {
    return FileType.other;
  }
};

export const getIconFile = (
  file: FileType
): FunctionComponent<SvgIconProps> => {
  switch (file) {
    case FileType.document:
      return DocIcon;
    case FileType.pdf:
      return PDFIcon;
    case FileType.image:
      return ImageIcon;
    case FileType.structured:
      return StructuredIcon;
    case FileType.video:
      return VideoIcon;
    case FileType.other:
    default:
      return GenericIcon;
  }
};
