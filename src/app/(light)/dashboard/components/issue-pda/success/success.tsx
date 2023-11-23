'use client';

import { queries } from '@/constants/queries';
import { useGtwSession } from '@/context/gtw-session-provider';
import { issuePda } from '@/locale/en/pda';
import { Issued_PdasQuery } from '@/services/protocol/types';
import { useQuery } from '@tanstack/react-query';

import { CheckOutlined } from '@mui/icons-material';
import { Avatar, Stack, Typography } from '@mui/material';

import PDAsTable from './pdas-table';
import SuccessSkeleton from './success-skeleton';

export default function Success() {
  const { privateApi } = useGtwSession();
  const {
    data: pdas,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [queries.pdas],
    queryFn: async () => privateApi.issued_pdas({ skip: 0, take: 5 }),
    select: (data: any) =>
      (data as Issued_PdasQuery)?.issuedPDAs as Issued_PdasQuery['issuedPDAs'],
  });

  return (
    <>
      {isFetching || isLoading ? (
        <SuccessSkeleton />
      ) : (
        <>
          <Stack sx={{ position: 'absolute', top: { xs: 24, md: 48 } }}>
            <Avatar
              sx={{ backgroundColor: 'success.main', color: 'action.active' }}
            >
              <CheckOutlined />
            </Avatar>
          </Stack>
          <Stack py={3}>
            <Typography variant="h4" mb={5}>
              {issuePda.success_title}
            </Typography>
            <PDAsTable
              data={pdas as Issued_PdasQuery['issuedPDAs']}
              totalCount={pdas?.length ?? 0}
            />
          </Stack>
        </>
      )}
    </>
  );
}
