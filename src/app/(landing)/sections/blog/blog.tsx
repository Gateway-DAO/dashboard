import Image from 'next/image';
import { Suspense } from 'react';

import routes from '@/constants/routes';
import { getPosts } from '@/services/server-functions/ghost-client';
import { PostOrPage } from '@tryghost/content-api';
import dayjs from 'dayjs';

import {
  Box,
  Card,
  CardActionArea,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import { Link } from '@mui/material';

function BlogCard({
  feature_image,
  feature_image_alt,
  title,
  created_at,
  slug,
}: PostOrPage) {
  return (
    <Card
      variant="outlined"
      sx={{
        flex: 1,
      }}
    >
      <CardActionArea
        component={Link}
        href={`/blog/${slug}`}
        sx={{
          p: 3,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            inset: 0,
            aspectRatio: 373 / 211,
            backgroundColor: 'primary.main',
            mb: 3,
          }}
        >
          <Image src={feature_image!} alt={feature_image_alt!} fill />
        </Box>
        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="caption">
          {dayjs(created_at).format('MMM DD, YYYY')}
        </Typography>
      </CardActionArea>
    </Card>
  );
}

async function BlogPosts() {
  try {
    const posts = await getPosts(3);

    return posts.map((post) => <BlogCard key={post.id} {...post} />);
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
