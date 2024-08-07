export const dynamic = 'force-dynamic';

import { Metadata } from 'next';
import Link from 'next/link';

import { getPosts, getAllTags } from '@/services/server-functions/ghost-client';

import { Container, Stack, Typography, Button, Box } from '@mui/material';

import BlogCard from '../components/blog-card';
import { blogMetadata } from '../utils';

export const metadata: Metadata = {
  ...blogMetadata,
  title: 'All Posts | Gateway Blog',
  openGraph: {
    ...blogMetadata.openGraph,
    title: 'All Posts | Gateway Blog',
    url: 'https://mygateway.xyz/blog/all',
  },
  twitter: {
    ...blogMetadata.twitter,
    title: 'All Posts | Gateway Blog',
  },
};

export default async function AllBlogPosts() {
  const posts = await getPosts(20);
  const tags = await getAllTags();

  return (
    <Container
      component={Stack}
      sx={{
        display: 'flex',
        py: 6,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Stack
        sx={{ mt: 10, width: '78.7%' }}
        direction={'column'}
        justifyContent={'space-between'}
      >
        <Stack direction={'row'} sx={{ mb: 4 }}>
          {tags.map((tag, index) => (
            <Button
              key={index}
              variant="text"
              size="medium"
              component={Link}
              href={`/blog/all/${tag.name}`}
              sx={{
                width: '10%',
                mt: 1,
                mr: 2,
                '&:hover': {
                  backgroundColor: '#fff',
                },
                bgcolor: '#fff',
              }}
            >
              {tag.name}
            </Button>
          ))}
        </Stack>
        <Typography variant="h5" sx={{ color: '#000000' }}>
          All posts
        </Typography>
      </Stack>
      <Box
        sx={{
          mt: 5,
          width: '78.7%',
          gap: 4,
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(2, 1fr)',
            lg: `repeat(${2}, 1fr)`,
          },
        }}
      >
        {posts.map((post, index) => (
          <BlogCard key={index} {...post} />
        ))}
      </Box>
    </Container>
  );
}
