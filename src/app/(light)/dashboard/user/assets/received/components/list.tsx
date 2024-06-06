'use client';

import InfiniteLoadMore from '@/components/infinite-load-more/infinite-load-more';
import PdaCardSkeleton from '@/components/pda-card/pda-card-skeleton';
import { useGtwSession } from '@/context/gtw-session-provider';
import { Received_PdasQuery } from '@/services/protocol/types';
import { useInfiniteQuery } from '@tanstack/react-query';

import { Stack, Typography } from '@mui/material';
import DataOutlinedIcon from '@/components/icons/data-outlined';
import PDAsList from '../../components/pdas-list';
import PDAsListContainer from '../../components/pdas-list-container';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
} from '@mui/x-data-grid';
import { DATE_FORMAT } from '@/constants/date';
import { pdaTableColumnNames } from '@/locale/en/pda';
import dayjs from 'dayjs';
import DownloadIcon from '@mui/icons-material/Download';
import IosShareIcon from '@mui/icons-material/IosShare';
import ArchiveIcon from '@mui/icons-material/Archive';
import {
  defaultGridConfiguration,
  defaultGridCustomization,
  gridWithoutNegativeMargin,
} from '@/components/data-grid/grid-default';
import { useRouter } from 'next-nprogress-bar';
import routes from '@/constants/routes';
import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';

type Props = {
  pdas: any;
};

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: pdaTableColumnNames.name,
    flex: 2,
    renderCell: (params) => (
      <Stack direction={'row'} justifyContent={'space-between'}>
        {params.row.structured ? <></> : <DataOutlinedIcon />}
        <Typography
          variant="body1"
          sx={{ mx: 2 }}
          onClick={() => console.log(params)}
        >
          {params.row.structured
            ? params.row.dataAsset?.title
            : params.row.fileName}
        </Typography>
      </Stack>
    ),
  },
  {
    field: 'uploaded by',
    headerName: pdaTableColumnNames.uploadedBy,
    flex: 1,
    renderCell: (params) => (
      <Stack direction={'row'}>
        <GTWAvatar
          name={params.row.issuer.username}
          alt={params.row.issuer.username}
        />
        <Typography variant="body1" sx={{ mx: 2, mt: 1 }}>
          {params.row.issuer.username}
        </Typography>
      </Stack>
    ),
  },
  {
    field: 'sharing',
    headerName: pdaTableColumnNames.sharing,
    renderCell: (params) => (
      <Typography variant="body1" fontWeight={700}>
        -
      </Typography>
    ),
  },
  {
    field: 'issuanceDate',
    headerName: pdaTableColumnNames.lastModified,
    flex: 1,
    valueFormatter: (params) =>
      params.value ? dayjs(params.value).format(DATE_FORMAT) : '',
  },
  {
    field: 'action',
    type: 'actions',
    getActions: (params) => [
      <GridActionsCellItem
        key={1}
        label="Share"
        icon={<IosShareIcon />}
        showInMenu
      />,
      <GridActionsCellItem
        label="Download"
        key={2}
        icon={<DownloadIcon />}
        showInMenu
      />,
      <GridActionsCellItem
        key={3}
        label="Archive"
        icon={<ArchiveIcon />}
        showInMenu
      />,
    ],
  },
];

export default function ReceivedPDAsList({ pdas: initialPdas }: Props) {
  const { privateApi } = useGtwSession();
  const router = useRouter();

  // const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
  //   useInfiniteQuery({
  //     queryKey: ['pdas', privateApi],
  //     queryFn: async ({ pageParam }) => {
  //       return (await privateApi!.received_pdas({ take: 6, skip: pageParam }))
  //         ?.myPDAs;
  //     },
  //     getNextPageParam: (lastPage, pages) =>
  //       lastPage && lastPage.length < 6 ? undefined : pages.length * 6,
  //     initialData: {
  //       pageParams: [0],
  //       pages: [initialPdas],
  //     },
  //   });

  // const pdas = data?.pages.flat().filter(Boolean);

  return (
    <>
      <Stack gap={1}>
        {/* <PDAsList pdas={pdas ?? []} />
        {privateApi && hasNextPage && (
          <InfiniteLoadMore
            isLoading={isFetchingNextPage}
            onLoadMore={() => fetchNextPage()}
          >
            <PDAsListContainer>
              <PdaCardSkeleton />
              <PdaCardSkeleton />
              <PdaCardSkeleton />
            </PDAsListContainer>
          </InfiniteLoadMore>
        )} */}
        <DataGrid
          {...defaultGridConfiguration}
          rows={initialPdas}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          onRowClick={(params: GridRowParams) => {
            router.push(`/dashboard/v3/asset/${params.id}`);
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={gridWithoutNegativeMargin}
        />
      </Stack>
    </>
  );
}
