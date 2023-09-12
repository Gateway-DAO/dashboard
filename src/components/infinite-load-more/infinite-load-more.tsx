'use client';

import { PropsWithChildren, useEffect } from 'react';

import Loading from '@/components/loadings/loading';
import { useInView } from 'react-intersection-observer';

import { Stack } from '@mui/material';

type Props = {
  isLoading: boolean;
  onLoadMore: () => void;
}

export default function InfiniteLoadMore({
  isLoading,
  onLoadMore,
  children,
}: PropsWithChildren<Props>) {

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !isLoading) {
      onLoadMore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, isLoading]);

  if (isLoading) {
    return children;
  }

  return (
    <Stack mt={2} ref={ref}>
    </Stack>
  );
}
