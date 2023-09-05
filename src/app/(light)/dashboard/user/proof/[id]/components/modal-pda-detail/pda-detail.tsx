'use client';
import PDAItem from '@/app/(light)/dashboard/user/asset/[id]/components/pda-item';
import PDASkeleton from '@/app/(light)/dashboard/user/asset/[id]/components/pda-skeleton';
import { errorMessages } from '@/locale/en/errors';
import { apiPublic } from '@/services/protocol/api';
import { useQuery } from '@tanstack/react-query';

import { Stack, Typography } from '@mui/material';

type Props = {
  id: string;
};

export default function PDADetail({ id }: Props) {
  const {
    data: pda,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['proof-pda', id],
    queryFn: () => apiPublic.pda({ id }),
    select: (data) => data.PDAbyId,
  });

  if (isLoading) {
    return <PDASkeleton />;
  }

  if (isError || !pda) {
    return (
      <Stack>
        <Typography>{errorMessages.UNEXPECTED_ERROR}</Typography>
      </Stack>
    );
  }
  return <PDAItem pda={pda} viewOnly={true} />;
}
