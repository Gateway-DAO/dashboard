import { common_elements } from '@/locale/en/common-elements';
import { pda as pdaLocale } from '@/locale/en/pda';
import { PrivateDataAsset, Proof } from '@/services/protocol-v3/types';
import { PartialDeep } from 'type-fest';

import { Typography } from '@mui/material';

import ShareQrCode from './share-qr-code';
import { ShareCopyQrCodeProps } from './types';

type Props = {
  onSuccess: (proof: Proof) => void;
  onError: (error: string) => void;
};

export default function ShareCopyQrCode({
  identification,
  pda,
  onSuccess,
  onError,
}: ShareCopyQrCodeProps & Props) {
  return (
    <>
      <Typography component="h2" variant="h4" sx={{ mb: 4 }}>
        {pdaLocale.share.share_a_copy_with}
      </Typography>
      <Typography mb={2}>{common_elements.scan_message}</Typography>
      <ShareQrCode identification={identification} pda={pda} />
      <button
        type="button"
        onClick={() => {
          onSuccess({
            verifier: {
              did: 'did:gatewayId:H2RVfDAhudKFczTJgo4aPCCqafelmcIX4W5H:hwrmbGnvFWHEozktwUgfKOfHyHpPhfGk0j3J1GyTOY0Jzgz',
              username: 'testuser',
            },
            data: [
              {
                id: 123213213213,
                dataAsset: {
                  title: 'Abc',
                },
                structured: true,
              } as PartialDeep<PrivateDataAsset>,
              {
                id: 1433,
                fileName: 'test.pdf',
                mimeType: 'application/pdf',
              } as PartialDeep<PrivateDataAsset>,
            ] satisfies PartialDeep<PrivateDataAsset>[] as any,
          } satisfies PartialDeep<Proof> as Proof);
        }}
      >
        onSuccess
      </button>
      <button type="button" onClick={() => onError('error')}>
        onError
      </button>
    </>
  );
}
