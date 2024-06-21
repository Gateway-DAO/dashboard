import {
  PrivateDataAsset,
  UserIdentificationInput,
} from '@/services/protocol-v3/types';

export type ShareCopyQrCodeProps = {
  identification: UserIdentificationInput;
  pda: PrivateDataAsset;
};
