'use client';

import PdaCard from '@/components/pda-card/pda-card';
import routes from '@/constants/routes';
import {
  Issued_PdasQuery,
  PdaStatus,
  Received_PdasQuery,
} from '@/services/protocol/types';
import { limitCharsCentered } from '@/utils/string';

import PDAsListContainer from './pdas-list-container';

type Props = {
  pdas: Received_PdasQuery['myPDAs'] | Issued_PdasQuery['issuedPDAs'];
  issuedPdas?: boolean;
};

export default function PDAsList({ pdas, issuedPdas }: Props) {
  return (
    <>
      {pdas && pdas.length > 0 && (
        <PDAsListContainer>
          {pdas.map((pda) => {
            const user = pda.dataAsset?.organization
              ? {
                  image: pda.dataAsset?.organization?.image,
                  name: pda.dataAsset?.organization?.name,
                }
              : {
                  image: issuedPdas
                    ? pda.dataAsset?.owner?.profilePicture ?? null
                    : pda.dataAsset?.issuer?.profilePicture ?? null,
                  name: issuedPdas
                    ? pda.dataAsset?.owner?.displayName ??
                      pda.dataAsset?.owner?.gatewayId ??
                      limitCharsCentered(pda.dataAsset?.owner?.id as string, 12)
                    : pda.dataAsset?.issuer?.displayName ??
                      pda.dataAsset?.issuer?.gatewayId ??
                      limitCharsCentered(
                        pda.dataAsset?.issuer?.id as string,
                        12
                      ),
                };
            return (
              <PdaCard
                key={pda.id}
                href={routes.dashboardUserAsset(pda.id!)}
                name={pda.dataAsset?.title ?? 'PDA name'}
                userImage={user.image}
                userName={user.name ?? 'Issuer'}
                status={pda.status ?? PdaStatus.Valid}
              />
            );
          })}
        </PDAsListContainer>
      )}
    </>
  );
}
