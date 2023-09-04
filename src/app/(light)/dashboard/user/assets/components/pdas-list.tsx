'use client';

import PdaCard from '@/components/pda-card/pda-card';
import routes from '@/constants/routes';
import usePrivateApi from '@/hooks/use-private-api';
import { pdas as pdasLocales } from '@/locale/en/pda';
import { CredentialStatus, PrivateDataAsset } from '@/services/protocol/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { DeepPartial } from 'react-hook-form';

import { Typography } from '@mui/material';

import PDAsListContainer from './pdas-list-container';

type Props = {
  pdas: DeepPartial<PrivateDataAsset>[];
};

// export default async function PDAsList({ pdas = [] }: Props) {
//   //TODO: Do pagination
//   if (!pdas.length) {
//   pdas: DeepPartial<PrivateDataAsset>[];
//   queryFn: (
//     context: QueryFunctionContext<any>,
//     pageSize: number
//   ) => Promise<any[]>;
// };

export default function PDAsList({ pdas }: Props) {
  const privateApi = usePrivateApi();
  const pageSize = 2;
  const {
    data: items,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['myPdas'],
    ({ pageParam }) =>
      async () => {
        const res = await privateApi.received_pdas({
          take: pageSize,
          skip: pageParam || 0,
        });
        return res.myPDAs;
      },
    {
      getNextPageParam: (lastPage: any = [], pages) =>
        lastPage.length < pageSize ? undefined : pages.length * pageSize,
      initialData: () => {
        if (pdas && pdas.length > 0) {
          return {
            pageParams: [undefined],
            pages: [pdas],
          };
        }
      },
    }
  );
  // const {
  //   data: credentials, //[ ] Rename this data credentials
  //   isLoading,
  //   isFetchingNextPage,
  //   fetchNextPage,
  // } = useInfiniteQuery(
  //   [queryString, dataModelId],
  //   (options) => queryFn(options, pageSize),
  //   {
  //     getNextPageParam: (lastPage: any = [], pages) =>
  //       lastPage.length < pageSize ? undefined : pages.length * pageSize,
  //   }
  // );

  if (!items || !items.pages.length || !items.pages[0].length) {
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
            href={routes.dashboardUserAsset(pda.id!)}
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
