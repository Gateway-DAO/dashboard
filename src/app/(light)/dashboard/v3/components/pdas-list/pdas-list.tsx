'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next-nprogress-bar';
import { useMemo } from 'react';

import {
  defaultGridConfiguration,
  gridWithoutNegativeMargin,
} from '@/components/data-grid/grid-default';
import { api } from '@/services/protocol-v3/api';
import { PrivateDataAsset } from '@/services/protocol-v3/types';
import { useToggle } from '@react-hookz/web';
import { useQuery } from '@tanstack/react-query';

import { Stack } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';

import UpdateModal from '../../../components/update-modal/update-modal';
import { columns } from './columns';

type Props = {
  pdas: PrivateDataAsset[];
};

export default function PDAsList({ pdas: initialPdas }: Props) {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const [isOpen, toggleOpen] = useToggle(false);
  const { data, isLoading } = useQuery({
    queryKey: ['pdas', sessionData],
    queryFn: async () => {
      if (!sessionData || !sessionData.token) throw new Error('No token');
      return api(sessionData.token).pdas();
    },
    enabled: !!sessionData?.token,
  });

  const pdas = useMemo(() => {
    const newPdas =
      data?.myPDAs.filter(
        (pda) => !initialPdas.find((initialPda) => initialPda.id === pda.id)
      ) ?? [];
    return [...newPdas, ...initialPdas];
  }, [data]);

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
              return window.open(`/dashboard/v3/asset/${params.id}`);
            }

            return router.push(`/dashboard/v3/asset/${params.id}`);
          }
          toggleOpen();
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={gridWithoutNegativeMargin}
      />
      <UpdateModal isOpen={isOpen} toggleOpen={toggleOpen} />
    </>
  );
}
