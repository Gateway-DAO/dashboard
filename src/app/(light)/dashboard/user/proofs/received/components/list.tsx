"use client";

import InfiniteLoadMore from "@/components/infinite-load-more/infinite-load-more";
import Loading from "@/components/loadings/loading";
import usePrivateApi from "@/hooks/use-private-api";
import { Proof } from "@/services/protocol/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PartialDeep } from "type-fest";

import { Stack } from "@mui/material";

import { TableSharedDataProofs } from "../../components/table-shared";

type Props = {
  proofs: PartialDeep<Proof>[];
}

export default function ReceivedProofsList({ proofs: initialProofs }: Props) {
  const privateApi = usePrivateApi();
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['proofs', privateApi],
    queryFn: async ({ pageParam }) => {
      return (await privateApi!.received_proofs({ take: 6, skip: pageParam }))?.receivedProofs as PartialDeep<Proof>[];
    },
    getNextPageParam: (lastPage, pages) => lastPage && lastPage.length < 6
      ? undefined
      : pages.length * 6,
    initialData: {
      pageParams: [0],
      pages: [initialProofs]
    },
  })

  const proofs = data?.pages.flat().filter(Boolean);

  return (<Stack gap={1}>
    <TableSharedDataProofs proofs={proofs ?? []} />
    {privateApi && hasNextPage && <InfiniteLoadMore isLoading={isFetchingNextPage} onLoadMore={() => fetchNextPage()}>
      <Loading />
    </InfiniteLoadMore>}
  </Stack>);
}
