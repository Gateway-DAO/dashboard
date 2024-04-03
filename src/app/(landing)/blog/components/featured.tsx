import { brandColors } from '@/theme/config/brand';
import { Container, Stack, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';

export default function FeaturedBlogPosts() {
  const posts = [
    {
      imageUrl: 'https://static.ghost.org/v4.0.0/images/feature-image.jpg',
      title: 'Test Title',
      description: 'Test short description',
    },
    {
      imageUrl: 'https://static.ghost.org/v4.0.0/images/feature-image.jpg',
      title: 'Test Title',
      description: 'Test short description',
    },
    {
      imageUrl: 'https://static.ghost.org/v4.0.0/images/feature-image.jpg',
      title: 'Test Title',
      description: 'Test short description',
    },
    {
      imageUrl: 'https://static.ghost.org/v4.0.0/images/feature-image.jpg',
      title: 'Test Title',
      description: 'Test short description',
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
          Featured blog posts
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

          gap: 4,
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(2, 1fr)',
            lg: `repeat(${2}, 1fr)`,
          },
        }}
      >
        {posts.map((post) => (
          <Stack direction={'column'}>
            <Image
              src={post.imageUrl}
              alt={post.title}
              width={560}
              height={300}
            />
            <Typography>{post.title}</Typography>
            <Typography>{post.description}</Typography>
          </Stack>
        ))}
      </Box>
    </Container>
  );
}
