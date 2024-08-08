export const dynamic = 'force-dynamic';

import Link from 'next/link';

import { getPosts } from '@/services/server-functions/ghost-client';
import { LANDING_NAVBAR_HEIGHT } from '@/theme/config/style-tokens';

import {
  Container,
  Stack,
  Box,
  Typography,
  Button,
  Divider,
} from '@mui/material';

import BlogCard from '../components/blog-card/blog-card';
import HeroPost from './components/hero-post';

export default async function LatestBlogPosts() {
  const [firstPost, ...initialPosts] = await getPosts(10);

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
            mt: 4,
            mb: 7,
          }}
        >
          <HeroPost {...firstPost} />
        </Box>
        <Divider />
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
          {initialPosts.map((post, index) => (
            <BlogCard key={index} {...post} />
          ))}
        </Box>
      </Container>
    </>
  );
}
