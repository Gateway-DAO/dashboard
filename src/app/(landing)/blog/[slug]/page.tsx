import Image from 'next/image';
import Link from 'next/link';

import {
  getSinglePost,
  getPosts,
} from '@/services/server-functions/ghost-client';
import { format } from 'date-fns';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Avatar, Link as MUILink } from '@mui/material';
import { Box, Breadcrumbs, Container, Stack, Typography } from '@mui/material';

// export async function generateStaticParams() {
//   const posts = await getPosts()
//   return posts.map((post) => ({
//     slug: post.slug,
//   }));
// }

export default async function Read({ params }: { params: { slug: string } }) {
  const getPost = await getSinglePost(params.slug);

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
              <Link href={`/tags/${getPost?.primary_tag.slug}`}>
                <Breadcrumbs
                  separator={<NavigateNextIcon fontSize="small" />}
                  aria-label="breadcrumb"
                >
                  {[
                    <MUILink
                      underline="hover"
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
              </Link>
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
          </Stack>
        </Stack>
      </Container>
    </Container>
  );
}
