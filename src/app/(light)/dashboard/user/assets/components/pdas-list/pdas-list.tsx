'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next-nprogress-bar';
import { useMemo } from 'react';

import {
  defaultGridConfiguration,
  gridWithoutNegativeMargin,
} from '@/components/data-grid/grid-default';
import routes from '@/constants/routes';
import { pdas as pdasLocales } from '@/locale/en/pda';
import { api } from '@/services/protocol-v3/api';
import { PrivateDataAsset } from '@/services/protocol-v3/types';
import { useToggle } from '@react-hookz/web';
import { useQuery } from '@tanstack/react-query';

import { Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';

import UpdateModal from '../../../../components/update-modal/update-modal';
import { columns } from './columns';

export default function PDAsList() {
  const { data: sessionData, status } = useSession();
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

  const pdas = useMemo(() => {
    if (!sessionData?.pdas) return [];
    const newPdas =
      data?.myPDAs.filter(
        (pda) =>
          !sessionData.pdas.find((initialPda) => initialPda.id === pda.id)
      ) ?? [];
    return [...newPdas, ...sessionData.pdas];
  }, [data]);

  const isLoading = status === 'loading' || isFetchingLatestPdas;

  return (
    <>
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
        loading={isLoading}
        onRowClick={(params: GridRowParams<PrivateDataAsset>, event) => {
          const isUpdate = !(params.row.dataAsset || params.row.fileName);
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
