import Image from 'next/image';
import Link from 'next/link';

import { brandColors } from '@/theme/config/brand';

import { ChevronRight } from '@mui/icons-material';
import { Container, Stack, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';

export default function LatestBlogPosts() {
  const posts = [
    {
      id: '660e3d44024fd40001ffbb04',
      title: 'test',
      excerpt:
        "This is Gateway Labs, a brand new site by Nuno Carvalho that's just getting started. Things will be up and running here shortly, but you can subscribe in the meantime if you'd like to stay up to date and receive emails when new content is published!",
      feature_image: 'https://static.ghost.org/v4.0.0/images/feature-image.jpg',
      primary_tag: 'News',
    },
    {
      id: '660e3d44024fd40001ffbb04',
      title: 'test',
      excerpt:
        "This is Gateway Labs, a brand new site by Nuno Carvalho that's just getting started. Things will be up and running here shortly, but you can subscribe in the meantime if you'd like to stay up to date and receive emails when new content is published!",
      feature_image: 'https://static.ghost.org/v4.0.0/images/feature-image.jpg',
      primary_tag: 'News',
    },
    {
      id: '660e3d44024fd40001ffbb04',
      title: 'test',
      excerpt:
        "This is Gateway Labs, a brand new site by Nuno Carvalho that's just getting started. Things will be up and running here shortly, but you can subscribe in the meantime if you'd like to stay up to date and receive emails when new content is published!",
      feature_image: 'https://static.ghost.org/v4.0.0/images/feature-image.jpg',
      primary_tag: 'News',
    },
    {
      id: '660e3d44024fd40001ffbb04',
      title: 'test',
      excerpt:
        "This is Gateway Labs, a brand new site by Nuno Carvalho that's just getting started. Things will be up and running here shortly, but you can subscribe in the meantime if you'd like to stay up to date and receive emails when new content is published!",
      feature_image: 'https://static.ghost.org/v4.0.0/images/feature-image.jpg',
      primary_tag: 'News',
    },
  ];
  return (
    <Container
      component={Stack}
      sx={{
        display: 'flex',
        py: 6,
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: brandColors.primaryLighter,
      }}
    >
      <Stack
        sx={{ mt: 10, width: '78.7%' }}
        direction={'row'}
        justifyContent={'space-between'}
      >
        <Typography variant="h5" sx={{ color: '#000000' }}>
          Latest posts
        </Typography>
        <Button
          variant="outlined"
          sx={{ border: 1, borderColor: '#000000', color: '#000000' }}
        >
          View All
        </Button>
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
          <Stack direction={'column'} key={index}>
            <Image
              src={post.feature_image}
              alt={post.title}
              width={560}
              height={300}
            />
            <Button
              variant="text"
              size="medium"
              sx={{
                width: '10%',
                mt: 2,
                '&:hover': {
                  backgroundColor: brandColors.primaryLighter,
                },
                bgcolor: '#fff',
              }}
            >
              {post.primary_tag}
            </Button>
            <Typography
              fontWeight={700}
              fontSize={'22px'}
              lineHeight={'28px'}
              color={'#000'}
              sx={{ mt: 1.5 }}
            >
              {post.title}
            </Typography>
            <Typography
              fontWeight={500}
              fontSize={'16px'}
              lineHeight={'24px'}
              color={'#000'}
              sx={{ mt: 1 }}
            >
              {post.excerpt}
            </Typography>
            <Link
              href={`/blog/${post.id}`}
              style={{
                textDecoration: 'none',
                color: '#771AC9',
                marginTop: 20,
              }}
            >
              <Stack direction={'row'}>
                <Typography sx={{}}>Read more</Typography>
                <ChevronRight />
              </Stack>
            </Link>
          </Stack>
        ))}
      </Box>
    </Container>
  );
}
