export const dynamic = 'force-dynamic';

import { getAllTags, getPosts } from '@/services/ghost';
import { LANDING_NAVBAR_HEIGHT } from '@/theme/config/style-tokens';

import { Container, Box, Divider, Stack } from '@mui/material';

import HeroPost from './components/hero-post';
import PostsList from './components/post-list/posts-list';
import TagList from './components/post-list/tag-list';

export default async function LatestBlogPosts() {
  const [firstPost] = await getPosts(1);

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
          <HeroPost {...firstPost!} />
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
          <PostsList ignoreId={firstPost!.id} />
        </Stack>
      </Stack>
    </>
  );
}
