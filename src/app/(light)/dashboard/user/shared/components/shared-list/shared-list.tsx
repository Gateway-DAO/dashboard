'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next-nprogress-bar';

import {
  defaultGridConfiguration,
  gridWithoutNegativeMargin,
} from '@/components/data-grid/grid-default';
import routes from '@/constants/routes';
import { shared } from '@/locale/en/shared';
import { api } from '@/services/protocol-v3/api';
import { PrivateDataAsset } from '@/services/protocol-v3/types';
import { useToggle } from '@react-hookz/web';
import { useQuery } from '@tanstack/react-query';

import { Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';

import UpdateModal from '../../../../components/update-modal/update-modal';
import { columns } from './columns';

export default function SharedList() {
  const { data: sessionData, status } = useSession();
  const router = useRouter();
  const [isOpen, toggleOpen] = useToggle(false);
  const { data, isLoading: isFetchingLatestPdas } = useQuery({
    queryKey: ['proofs', sessionData],
    queryFn: async () => {
      if (!sessionData || !sessionData.token) throw new Error('No token');
      return api(sessionData.token).shared();
    },
    enabled: !!sessionData?.token,
  });

  const isLoading = status === 'loading' || isFetchingLatestPdas;

  const pdas = [];

  console.log(data);

  return (
    <>
      <DataGrid
        {...defaultGridConfiguration}
        rows={[]}
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
          {shared.empty}
        </Typography>
      )}
      <UpdateModal isOpen={isOpen} toggleOpen={toggleOpen} />
    </>
  );
}
