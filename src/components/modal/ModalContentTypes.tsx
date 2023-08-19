import { ReactNode } from 'react';

import GeneralData from './general-data';
import QRCodeOrImage from './qr-code-or-image';

export type ModalTabProps = {
  key: string;
  label: string;
  section: ModalContentProps;
};

export type ModalContentTypes = {
  [x: string]: string;
};

export type ModalContentProps = {
  handleClose: () => void;
  children: ReactNode;
  swipeableDrawer?: boolean;
  imageUrl?: string;
  enableDownloadImage?: boolean;
  modalType: string;
  fullWidth?: boolean;
};

export const modalContentTypes: ModalContentTypes = {
  image: 'image',
  general: 'general',
};

export function ModalContentView(props: ModalContentProps) {
  switch (props.modalType) {
    case modalContentTypes.image:
      return <QRCodeOrImage {...props} />;
    case modalContentTypes.general:
      return <GeneralData {...props} />;
    default:
      return <GeneralData {...props} />;
  }
}
