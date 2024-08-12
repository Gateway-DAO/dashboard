'use client';

import BlogCard from '@/app/(landing)/components/blog-card/blog-card';
import { useInfiniteQuery } from '@tanstack/react-query';
import { PostsOrPages } from '@tryghost/content-api';
import { useQueryState } from 'nuqs';

import { Box, Button } from '@mui/material';

type Props = {
  initialPosts: PostsOrPages;
  initialMeta: PostsOrPages['meta'];
};

type Page = { posts: PostsOrPages; meta: PostsOrPages['meta'] };

export default function PostsList({ initialPosts, initialMeta }: Props) {
  const [tag] = useQueryState('tag');

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery<Page>({
    queryKey: ['posts', tag],
    queryFn: async ({ queryKey, pageParam = 1 }) => {
      const searchParams = new URLSearchParams();

      if (typeof queryKey?.[1] === 'string') {
        searchParams.set('tag', queryKey[1]);
      }

      if (typeof pageParam === 'number') {
        searchParams.set('page', pageParam.toString());
      }

      const url = `/api/blog?${searchParams.toString()}`;
      const res = await fetch(url);
      return res.json();
    },
    initialData: {
      pages: [{ posts: initialPosts, meta: initialMeta }],
      pageParams: [tag],
    },
    getNextPageParam: (lastPage) => {
      if (lastPage?.meta?.pagination.next) {
        return lastPage.meta.pagination.next;
      }
    },
  });

  const pages = data?.pages.flat();

  return (
    <>
      <Box
        sx={{
          gap: 4,
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          },
        }}
      >
        {pages?.map((page) =>
          page.posts.map((post) => <BlogCard key={post.id} {...post} />)
        )}
      </Box>
      {hasNextPage && (
        <Button variant="outlined" onClick={() => fetchNextPage()}>
          Next Page
        </Button>
      )}
    </>
  );
}
