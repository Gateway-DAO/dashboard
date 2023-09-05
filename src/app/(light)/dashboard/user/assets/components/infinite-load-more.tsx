'use client';

import { useEffect, useState } from 'react';

import PDAsList from '@/app/(light)/dashboard/user/assets/components/pdas-list';
import { getMyPdas } from '@/app/actions/get-myPdas';
import { useToggle } from '@react-hookz/web';
import { useInView } from 'react-intersection-observer';

import { Button, Stack } from '@mui/material';

import Loading from '../../../../../../components/loadings/loading';

export default function InfiniteLoadMore({ pageSize = 6 }) {
  const [items, setItems] = useState<any[]>([]);
  const [pagesLoaded, setPagesLoaded] = useState(0);
  const [loadMoreButton, toggleLoadMoreButton] = useToggle(false);
  const [firstLoadMore, toggleFirstLoadMore] = useToggle(true);

  const { ref, inView } = useInView();

  const loadMoreItems = async () => {
    const nextPage = pagesLoaded + 1;
    const skip = pageSize * nextPage;
    const newItems = (await getMyPdas(skip, pageSize)) ?? [];
    setItems((prevItems) => [...prevItems, ...newItems]);
    setPagesLoaded(nextPage);
    if (newItems && newItems.length && newItems.length < pageSize) {
      toggleLoadMoreButton(false);
    } else {
      toggleLoadMoreButton(true);
    }
    toggleFirstLoadMore(false);
  };

  useEffect(() => {
    if (inView && loadMoreButton) {
      loadMoreItems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, loadMoreButton]);

  return (
    <>
      <Stack mt={1}>
        <PDAsList pdas={items} />
      </Stack>
      {firstLoadMore && (
        <Stack mt={2} display="flex" alignItems="center">
          <Button
            variant="outlined"
            size="medium"
            onClick={() => {
              toggleLoadMoreButton(true);
              toggleFirstLoadMore(false);
            }}
          >
            load more
          </Button>
        </Stack>
      )}
      {loadMoreButton && (
        <Stack mt={2} ref={ref}>
          <Loading />
        </Stack>
      )}
    </>
  );
}
