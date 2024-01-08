import { queries } from '@/constants/queries';
import { useGtwSession } from '@/context/gtw-session-provider';
import { useQuery } from '@tanstack/react-query';

import useOrganization from './use-organization';

export default function useMyWallet() {
  const { privateApi, session } = useGtwSession();
  const { organization } = useOrganization();

  const {
    data: myWallet,
    isLoading,
    refetch,
  } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [
      queries.my_wallet,
      organization ? organization.id : session?.user.id,
    ],
    queryFn: () =>
      privateApi.my_balance({
        organizationId: organization?.id as string,
      }),
    select: (data) => data.myWallet,
    refetchInterval: 60 * 1000,
  });

  return {
    myWallet,
    isLoading,
    onRefresh: refetch,
  };
}
