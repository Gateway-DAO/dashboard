export const dynamic = 'force-dynamic';

import { getAllTags, getPosts } from '@/services/server-functions/ghost-client';
import { LANDING_NAVBAR_HEIGHT } from '@/theme/config/style-tokens';
import { PageWithSearchParams } from '@/types/next';

import { Container, Box, Divider, Stack } from '@mui/material';

import HeroPost from './components/hero-post';
import PostsList from './components/post-list/posts-list';
import TagList from './components/post-list/tag-list';
import { BLOG_PAGE_SIZE } from './constants';

export default async function LatestBlogPosts({
  searchParams,
}: PageWithSearchParams<{ tag?: string }>) {
  const [firstPost] = await getPosts(1);
  const initialPosts = await getPosts(BLOG_PAGE_SIZE, {
    page: 0,
    tag: searchParams?.tag,
    ignoreIds: [firstPost.id],
  });

  const tags = await getAllTags();

  return (
    <>
      <Stack
        component={Container}
        sx={{
          ...LANDING_NAVBAR_HEIGHT,
          pb: 10,
        }}
      >
        <Box
          sx={{
            pt: 4,
          }}
        >
          <HeroPost {...firstPost} />
        </Box>
        <Divider
          sx={{
            my: {
              xs: 6,
              md: 7,
            },
          }}
        />
        <TagList tags={tags} />
        <Stack gap={5}>
          <PostsList
            initialPosts={initialPosts}
            initialMeta={initialPosts.meta}
            ignoreId={firstPost.id}
          />
        </Stack>
      </Stack>
    </>
  );
}
