import Image from 'next/image';
import Link from 'next/link';

import {
  getSinglePost,
  getPosts,
} from '@/services/server-functions/ghost-client';
import { brandColors } from '@/theme/config/brand';
import { format } from 'date-fns';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Avatar, Button, Divider, Link as MUILink } from '@mui/material';
import { Box, Breadcrumbs, Container, Stack, Typography } from '@mui/material';

import BlogCard from '../components/blog-card';
import '../cards.css';

// export async function generateStaticParams() {
//   const posts = await getPosts()
//   return posts.map((post) => ({
//     slug: post.slug,
//   }));
// }

export default async function Read({ params }: { params: { slug: string } }) {
  const getPost = await getSinglePost(params.slug);
  const latestPost = await getPosts(2);

  console.log(getPost);

  return (
    <Container component={'main'}>
      <Container component={'article'} sx={{ mt: 15, py: 5 }}>
        <Stack
          component={'header'}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Stack minWidth={850} alignSelf={'center'}>
            {getPost?.primary_tag ? (
              <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
              >
                {[
                  <MUILink
                    underline="none"
                    key="1"
                    color="inherit"
                    href="/blog"
                  >
                    Blog
                  </MUILink>,
                  <Typography key="3" color="text.primary">
                    {getPost?.primary_tag.name}
                  </Typography>,
                ]}
              </Breadcrumbs>
            ) : (
              ''
            )}
            <Typography component={'title'} mt={1} variant="h2" gutterBottom>
              {getPost?.title}
            </Typography>
            <Typography mt={1} variant="h4" gutterBottom>
              {getPost?.excerpt}
            </Typography>
          </Stack>
          <Stack
            mt={3}
            display={'flex'}
            justifyContent={'space-between'}
            flexDirection={'row'}
            alignSelf={'center'}
          >
            <Stack
              alignSelf={'flex-start'}
              minWidth={850}
              flexDirection={'row'}
              alignContent={'center'}
            >
              <Avatar alt={'Gateway'} src={'/images/default-user.svg'} />
              <Stack ml={2}>
                <Typography variant="subtitle2">
                  {getPost?.primary_author?.name}
                </Typography>
                <Typography variant="body2">
                  {format(
                    new Date(getPost?.published_at as string),
                    'dd MMMM, yyyy'
                  )}{' '}
                  . {getPost?.reading_time} Min Read
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack component={'figure'} mt={8}>
            <Image
              style={{ alignSelf: 'center' }}
              width={1000}
              height={250}
              src={getPost?.feature_image || ''}
              alt={getPost?.feature_image_alt || 'No image found'}
            />
            <Stack
              alignSelf={'center'}
              marginTop={1}
              direction={'row'}
              component={'figcaption'}
              dangerouslySetInnerHTML={{
                __html: getPost?.feature_image_caption as string,
              }}
            ></Stack>
          </Stack>
          <Stack maxWidth={850} overflow={'hidden'} alignSelf={'center'}>
            <Box
              dangerouslySetInnerHTML={{ __html: getPost?.html as string }}
            ></Box>
            <Stack mt={3} component={'aside'}>
              <Stack mb={3}>
                <Typography gutterBottom>Share this post</Typography>
              </Stack>
              <Divider />
              <Stack
                marginTop={3}
                alignSelf={'flex-start'}
                flexDirection={'row'}
                alignContent={'center'}
              >
                <Avatar
                  alt={getPost?.primary_author?.name || 'Gateway'}
                  src={
                    getPost?.primary_author?.profile_image ||
                    '/images/default-user.svg'
                  }
                />
                <Stack ml={2}>
                  <Typography variant="subtitle2">
                    {getPost?.primary_author?.name}
                  </Typography>
                  <Typography variant="body2">
                    {getPost?.primary_author?.bio || ''}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Container>
      <Stack component={'aside'} mx={20}>
        <Typography variant="h4">Trending</Typography>
        <Stack
          direction={'row'}
          mt={3}
          display={'flex'}
          justifyContent={'space-between'}
        >
          <Typography alignSelf={'self-end'}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
          </Typography>
          <Button variant="outlined" size="large">
            View all
          </Button>
        </Stack>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          columnGap={4}
          mt={3}
          display="grid"
          sx={{
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
          }}
        >
          {latestPost.map((post) => {
            return (
              <BlogCard
                excerpt={post.excerpt as string}
                feature_image={post.feature_image as string}
                primary_tag={post.primary_tag?.name as string}
                title={post.title as string}
                key={post?.id}
                slug={post.slug}
              />
            );
          })}
        </Stack>
      </Stack>
    </Container>
  );
}
