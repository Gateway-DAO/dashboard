import { Metadata } from 'next';
import Link from 'next/link';

import {
  getAllTags,
  getNavigation,
  getTagPosts,
} from '@/services/server-functions/ghost-client';
import { brandColors } from '@/theme/config/brand';

import { Container, Stack, Typography, Button, Box } from '@mui/material';

import BlogCard from '../../../components/blog-card/blog-card';
import { blogMetadata } from '../../utils';

export async function generateMetadata({
  params,
}: {
  params: { tag: string };
}): Promise<Metadata> {
  return {
    ...blogMetadata,
    title: `${params.tag} | Gateway Blog`,
    openGraph: {
      ...blogMetadata.openGraph,
      title: `${params.tag} | Gateway Blog`,
      url: `https://mygateway.xyz/blog/all/${params.tag}`,
    },
    twitter: {
      ...blogMetadata.twitter,
      title: `${params.tag} | Gateway Blog`,
    },
  };
}

export default async function AllBlogPosts({
  params,
}: {
  params: { tag: string };
}) {
  const posts = await getTagPosts(params.tag);
  const tags = await getAllTags();

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
                  backgroundColor:
                    params.tag === tag.name
                      ? brandColors.primaryLighter
                      : '#fff',
                },
                bgcolor:
                  params.tag === tag.name ? brandColors.primaryLighter : '#fff',
                borderColor: params.tag === tag.name ? brandColors.primary : '',
                border: params.tag === tag.name ? 1 : 0,
              }}
            >
              {tag.name}
            </Button>
          ))}
          <Button
            variant="text"
            size="medium"
            component={Link}
            href={`/blog/all`}
            sx={{ mt: 1 }}
          >
            Go back
          </Button>
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
