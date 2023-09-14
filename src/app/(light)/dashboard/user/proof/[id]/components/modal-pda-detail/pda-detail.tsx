'use client';
import PDAItem from '@/app/(light)/dashboard/user/asset/[id]/components/pda-item';
import PDASkeleton from '@/app/(light)/dashboard/user/asset/[id]/components/pda-skeleton';
import DefaultError from '@/components/default-error/default-error';
import { useSession } from '@/context/session-provider';
import { errorMessages } from '@/locale/en/errors';
import { useQuery } from '@tanstack/react-query';

type Props = {
  id: string;
};

export default function PDADetail({ id }: Props) {
  const { privateApi } = useSession();
  const {
    data: pda,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['proof-pda', id],
    queryFn: () => privateApi?.pda({ id }),
    select: (data) => data?.PDAbyId,
  });

  if (isLoading) {
    return <PDASkeleton />;
  }

  if (isError || !pda) {
    return (
      <DefaultError message={errorMessages.UNEXPECTED_ERROR} isModal={true} />
    );
  }
  return <PDAItem pda={pda} viewOnly={true} />;
}
