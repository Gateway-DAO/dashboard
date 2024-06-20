'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next-nprogress-bar';
import { useMemo } from 'react';

import UtilsSocketSessionId from '@/app/(light)/dashboard/components/utils/socket-session-id';
import {
  defaultGridConfiguration,
  gridWithoutNegativeMargin,
} from '@/components/data-grid/grid-default';
import routes from '@/constants/routes';
import { pdas as pdasLocales } from '@/locale/en/pda';
import { api } from '@/services/protocol-v3/api';
import { PrivateDataAsset } from '@/services/protocol-v3/types';
import { SessionUpdate } from '@/types/session';
import { useToggle } from '@react-hookz/web';
import { useQuery } from '@tanstack/react-query';

import { Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';

import UpdateModal from '../../../../components/update-modal/update-modal';
import { columns } from './columns';
import { ListPrivateDataAsset } from './types';

export default function PDAsList() {
  const { data: sessionData, status, update } = useSession();
  const router = useRouter();
  const [isOpen, toggleOpen] = useToggle(false);

  const { data, isLoading: isFetchingLatestPdas } = useQuery({
    queryKey: ['pdas', sessionData],
    queryFn: async () => {
      if (!sessionData || !sessionData.token) throw new Error('No token');
      return api(sessionData.token).pdas();
    },
    enabled: !!sessionData?.token,
  });

  const pdas: ListPrivateDataAsset[] = useMemo(() => {
    if (!sessionData?.pdas) return [];
    const newPdas: ListPrivateDataAsset[] = [];

    for (const pda of data?.myPDAs ?? []) {
      const hasPda = sessionData.pdas.find(
        (initialPda) => initialPda.id === pda.id
      );
      if (hasPda) {
        continue;
      }
      newPdas.push({
        ...pda,
        new: true,
      } as ListPrivateDataAsset);
    }

    return [...newPdas, ...sessionData.pdas];
  }, [data]);

  const isLoading = status === 'loading' || isFetchingLatestPdas;

  return (
    <>
      {/* <UtilsSocketSessionId
        event="upload"
        connectionType="upload"
        eventMethod={(pda: PrivateDataAsset) => {
          update({
            type: 'pdas',
            pdas: [pda],
          } satisfies SessionUpdate);
        }}
      /> */}
      <DataGrid
        {...defaultGridConfiguration}
        rows={pdas}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        slots={{
          loadingOverlay: LinearProgress,
        }}
        paginationMode="client"
        loading={isLoading}
        onRowClick={(params: GridRowParams<ListPrivateDataAsset>, event) => {
          const isUpdate = params.row.new;
          if (!isUpdate) {
            // if middle click open new tab
            if (event.button === 1) {
              return window.open(routes.dashboard.user.asset(params.id));
            }

            return router.push(routes.dashboard.user.asset(params.id));
          }
          toggleOpen();
        }}
        pageSizeOptions={[5, 10]}
        sx={gridWithoutNegativeMargin}
      />
      {!isLoading && !pdas.length && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: 'center', width: '100%' }}
        >
          {pdasLocales.empty}
        </Typography>
      )}
      <UpdateModal isOpen={isOpen} toggleOpen={toggleOpen} />
    </>
  );
}
