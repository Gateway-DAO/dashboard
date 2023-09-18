'use client';

import PdaCard from '@/components/pda-card/pda-card';
import routes from '@/constants/routes';
import { PdaStatus, PrivateDataAsset } from '@/services/protocol/types';
import { PartialDeep } from 'type-fest';

import PDAsListContainer from './pdas-list-container';

type Props = {
  pdas: PartialDeep<PrivateDataAsset>[];
};

export default function PDAsList({ pdas }: Props) {
  return (
    <>
      {pdas && pdas.length > 0 && (
        <PDAsListContainer>
          {pdas.map((pda: PartialDeep<PrivateDataAsset>) => {
            const issuer = pda.dataAsset?.organization
              ? {
                  image: pda.dataAsset?.organization?.image,
                  name: pda.dataAsset?.organization?.name,
                }
              : {
                  image: null,
                  name: pda.dataAsset?.issuer?.gatewayId,
                };
            return (
              <PdaCard
                key={pda.id}
                href={routes.dashboardUserAsset(pda.id!)}
                name={pda.dataAsset?.title ?? 'PDA name'}
                issuerImage={issuer.image}
                issuerName={issuer.name ?? 'Issuer'}
                status={pda.status ?? PdaStatus.Valid}
              />
            );
          })}
        </PDAsListContainer>
      )}
    </>
  );
}
