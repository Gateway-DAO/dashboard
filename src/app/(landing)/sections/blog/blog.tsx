import { Suspense } from 'react';

import { getPosts } from '@/services/server-functions/ghost-client';

import { Box, Container, Stack, Typography } from '@mui/material';

import BlogCard from '../../components/blog-card/blog-card';

async function BlogPosts() {
  try {
    const posts = await getPosts(3);

    return posts.map((post) => (
      <BlogCard key={post.id} {...post} primary_tag={null} />
    ));
  } catch (e) {
    return <Box>Error Loading blog posts</Box>;
  }
}

export default function BlogSection() {
  return (
    <Container
      component="section"
      sx={{
        pt: {
          xs: 6,
          md: 15,
        },
        pb: {
          xs: 6,
          md: 15,
        },
      }}
    >
      <Typography
        variant="h3"
        sx={{
          mb: 4,
          typography: {
            xs: 'h5',
            md: 'h3',
          },
        }}
      >
        Latest updates
      </Typography>
      <Stack
        flexDirection={{
          xs: 'column',
          md: 'row',
        }}
        gap={2}
      >
        <Suspense fallback={<Box>Loading...</Box>}>
          <BlogPosts />
        </Suspense>
      </Stack>
    </Container>
  );
}
