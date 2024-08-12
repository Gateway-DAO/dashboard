export const dynamic = 'force-dynamic';

import { getAllTags, getPosts } from '@/services/server-functions/ghost-client';
import { LANDING_NAVBAR_HEIGHT } from '@/theme/config/style-tokens';
import { PageWithSearchParams } from '@/types/next';

import { Container, Box, Divider } from '@mui/material';

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
  });
  const tags = await getAllTags();

  return (
    <>
      <Container
        sx={{
          ...LANDING_NAVBAR_HEIGHT,
          pb: 10,
        }}
      >
        <Box
          sx={{
            py: 4,
          }}
        >
          <HeroPost {...firstPost} />
        </Box>
        <Divider sx={{ my: 3 }} />
        <TagList tags={tags} />
        <PostsList
          initialPosts={initialPosts}
          initialMeta={initialPosts.meta}
        />
      </Container>
    </>
  );
}
