'use client';
import PDAItem from '@/app/dashboard/user/asset/[id]/components/pda-item';
import PDASkeleton from '@/app/dashboard/user/asset/[id]/components/pda-skeleton';
import { apiPublic } from '@/services/protocol/api';
import { useQuery } from '@tanstack/react-query';

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
    select: (data) => data.credential,
  });

  if (isLoading) {
    return <PDASkeleton />;
  }

  if (isError || !pda) {
    return <div>Error</div>;
  }
  return <PDAItem pda={pda} viewOnly={true} />;
}
