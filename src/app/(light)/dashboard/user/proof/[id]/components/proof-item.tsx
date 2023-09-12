import { DataModel, DecryptedProofPda, Proof } from '@/services/protocol/types';
import {
  CONTAINER_PX,
  NEGATIVE_CONTAINER_PX,
  WIDTH_CENTERED,
} from '@/theme/config/style-tokens';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { Divider, Stack } from '@mui/material';

import ModalPDADetail from './modal-pda-detail/modal-pda-detail';
import ProofCardInfo from './proof-card-info';
import ProofCardTitle from './proof-card-title';
import ProofData from './proof-data';
import ProofRevokeButton from './proof-revoke-button';
import ProofShareButton from './proof-share-button';

type Props = {
  proof: PartialDeep<Proof>;
};

export default function ProofItem({ proof }: Props) {
  return (
    <>
      <Stack sx={{ ...WIDTH_CENTERED, my: 2 }}>
        <ProofCardTitle proof={proof} />
        <ProofCardInfo proof={proof} />
        {/* <ProofShareButton proof={proof} />
        <ProofRevokeButton proof={proof} /> */}
        {/* <Activities
          activities={proof.activities}
          activitiesTextsType={{
            Issued: pda.activities.issued,
            Revoked: pda.activities.revoked,
            Suspended: pda.activities.suspended,
            Reactivated: pda.activities.reactivated,
            Updated: pda.activities.updated,
          }}
        /> */}
      </Stack>
      <Divider
        sx={{
          mb: 5,
          mt: 2,
          mx: NEGATIVE_CONTAINER_PX,
          px: CONTAINER_PX,
        }}
      />
      <ProofData
        dataModels={proof?.data?.dataModels as DataModel[]}
        pdas={proof?.data?.PDAs as DecryptedProofPda[]}
      />
      <ModalPDADetail />
    </>
  );
}
