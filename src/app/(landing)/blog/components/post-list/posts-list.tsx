'use client';

import BlogCard from '@/app/(landing)/components/blog-card/blog-card';
import { useInfiniteQuery } from '@tanstack/react-query';
import { PostsOrPages } from '@tryghost/content-api';
import { useQueryState } from 'nuqs';

import { Box, Button } from '@mui/material';

import { PostsLoadingList } from './posts-loading-list';

type Props = {
  ignoreId: string;
};

type Page = { posts: PostsOrPages; meta: PostsOrPages['meta'] };

export default function PostsList({ ignoreId }: Props) {
  const [tag] = useQueryState('tag');

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery<Page>({
      queryKey: ['posts', tag, ignoreId],
      queryFn: async ({ queryKey, pageParam = 1 }) => {
        const searchParams = new URLSearchParams();

        if (typeof queryKey?.[1] === 'string') {
          searchParams.set('tag', queryKey[1]);
        }

        if (typeof pageParam === 'number') {
          searchParams.set('page', pageParam.toString());
        }
        searchParams.set('ignoreId', ignoreId);

        const url = `/api/blog?${searchParams.toString()}`;
        const res = await fetch(url);
        return res.json();
      },
      getNextPageParam: (lastPage) => {
        if (lastPage?.meta?.pagination.next) {
          return lastPage.meta.pagination.next;
        }
      },
    });

  const pages = data?.pages.flat();

  const isInitialLoading = isFetching && !isFetchingNextPage;

  return (
    <>
      <Box
        sx={{
          gap: 2,
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          },
        }}
      >
        {isInitialLoading ? (
          <PostsLoadingList />
        ) : (
          pages?.map((page) =>
            page.posts.map((post) => <BlogCard key={post.id} {...post} />)
          )
        )}
        {isFetchingNextPage && <PostsLoadingList />}
      </Box>
      {hasNextPage && !isFetchingNextPage && (
        <Button
          variant="outlined"
          onClick={() => fetchNextPage()}
          size="large"
          sx={{
            alignSelf: 'center',
          }}
        >
          Load More
        </Button>
      )}
    </>
  );
}
