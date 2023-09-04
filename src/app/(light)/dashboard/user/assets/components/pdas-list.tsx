import PdaCard from '@/components/pda-card/pda-card';
import routes from '@/constants/routes';
import { pdas as pdasLocales } from '@/locale/en/pda';
import { CredentialStatus, PrivateDataAsset } from '@/services/protocol/types';
import { DeepPartial } from 'react-hook-form';

import { Typography } from '@mui/material';

import PDAsListContainer from './pdas-list-container';

type Props = {
  pdas: DeepPartial<PrivateDataAsset>[];
};

export default async function PDAsList({ pdas }: Props) {
  //TODO: Do pagination
  if (!pdas.length) {
    return (
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ textAlign: 'center', width: '100%' }}
      >
        {pdasLocales.empty}
      </Typography>
    );
  }
  return (
    <PDAsListContainer>
      {pdas.map((pda) => {
        const issuer = pda.dataAsset?.organization
          ? {
              image: pda.dataAsset?.organization?.image,
              name: pda.dataAsset?.organization?.name,
            }
          : {
              image: null,
              name: pda.dataAsset?.issuer?.user?.gatewayId,
            };
        return (
          <PdaCard
            key={pda.id}
            href={routes.dashboardUserAsset.replace('[id]', pda.id!)}
            name={pda.dataAsset?.title ?? 'PDA name'}
            issuerImage={issuer.image}
            issuerName={issuer.name ?? 'Issuer'}
            status={pda.dataAsset?.status ?? CredentialStatus.Valid}
          />
        );
      })}
    </PDAsListContainer>
  );
}
