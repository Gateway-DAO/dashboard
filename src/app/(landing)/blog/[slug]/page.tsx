import { Metadata } from 'next';
import Image from 'next/image';

import {
  getSinglePost,
  getPosts,
} from '@/services/server-functions/ghost-client';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Avatar, Button, Divider, Link as MUILink } from '@mui/material';
import { Box, Breadcrumbs, Container, Stack, Typography } from '@mui/material';

import BlogCard from '../components/blog-card';
import { ShareButtonFn } from '../components/share-card';
import './cards.min.css';

function formatDate(date: Date) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).formatToParts(date);

  let day, month, year;

  for (const part of parts) {
    if (part.type === 'day') day = part.value;
    if (part.type === 'month') month = part.value;
    if (part.type === 'year') year = part.value;
  }

  return `${day} ${month} ${year}`;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const metaData = await getSinglePost(params.slug);
  if (!metaData) {
    return {
      title: 'Not Found',
      description: '',
      keywords: [],
      openGraph: {
        title: 'Not Found',
        description: '',
        url: '',
        images: [{ url: '/images/default-user.svg' }],
        type: 'website',
      },
    };
  }

  const tags = metaData.tags
    ? metaData?.tags.map((item) => item.name)
    : ['gateway blogs'];

  return {
    title: metaData.title,
    description: metaData.excerpt,
    keywords: tags as [string],
    openGraph: {
      title: metaData.title,
      description: metaData.excerpt,
      url: metaData.url,
      images: [
        {
          url: metaData.feature_image || '/images/default-user.svg',
        },
      ],
      type: 'website',
    },
    authors:
      metaData?.authors?.map((author) => {
        return { name: author.name };
      }) || null,
  };
}

export default async function Read({ params }: { params: { slug: string } }) {
  const getPost = await getSinglePost(params.slug);
  const latestPost = await getPosts(2);

  return (
    <Container component={'main'} sx={{ py: 5 }}>
      <Container
        component={'article'}
        sx={{
          mt: { xs: 2, md: 8 },
          py: 5,
        }}
      >
        <Stack component={'header'} sx={{ display: 'flex' }}>
          <Stack mx={{ xs: 0, md: 26 }}>
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
            <Typography mt={1} fontWeight={700} variant="h3" gutterBottom>
              {getPost?.title}
            </Typography>
            <Typography mt={1} variant="h6" fontWeight={400} gutterBottom>
              {getPost?.excerpt}
            </Typography>
            <Stack
              mt={3}
              display={'flex'}
              justifyContent={'space-between'}
              flexDirection={'row'}
            >
              <Stack alignSelf={'flex-start'} flexDirection={'row'}>
                <Avatar alt={'Gateway'} src={'/images/default-user.svg'} />
                <Stack ml={2}>
                  <Typography variant="subtitle2">
                    {getPost?.primary_author?.name}
                  </Typography>
                  <Typography variant="body2">
                    {formatDate(new Date(getPost?.published_at as string))}.{' '}
                    {getPost?.reading_time} Min Read
                  </Typography>
                </Stack>
              </Stack>
              <ShareButtonFn
                title={getPost?.title}
                description={getPost?.excerpt}
              />
            </Stack>
          </Stack>

          <Stack component={'figure'} mt={8}>
            <Image
              style={{ alignSelf: 'center' }}
              width={1152}
              height={200}
              className="feature-img"
              layout="responsive"
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
          <Stack mx={{ xs: 0, md: 26 }}>
            <Box
              dangerouslySetInnerHTML={{ __html: getPost?.html as string }}
            ></Box>
            <Stack mt={3} component={'aside'}>
              <Stack
                mb={3}
                direction="row"
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Typography>Share this post</Typography>
                <ShareButtonFn
                  title={getPost?.title}
                  description={getPost?.excerpt}
                />
              </Stack>
              <Divider sx={{ border: 1 }} />
              <Stack
                direction={{ xs: 'column', md: 'row' }}
                alignItems={{ xs: 'center', md: 'flex-start' }}
                marginTop={3}
                justifySelf={'center'}
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
                <Stack
                  ml={{ xs: 0, md: 2 }}
                  mt={{ xs: 1, md: 0 }}
                  textAlign={{ xs: 'center', md: 'left' }}
                >
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
      <Stack component={'aside'} mx={{ xs: 1, md: 12 }}>
        <Typography variant="h4">Trending</Typography>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          mt={3}
          display={'flex'}
          justifyContent={'space-between'}
          rowGap={2}
        >
          <Typography alignSelf={{ xs: 'flex-start', md: 'self-end' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
          </Typography>
          <Button variant="outlined" size={'medium'} href={`/blog/all`}>
            View all
          </Button>
        </Stack>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          rowGap={4}
          columnGap={4}
          mt={3}
          display="grid"
          sx={{
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              md: 'repeat(2, 1fr)',
            },
          }}
        >
          {latestPost.map((post, index) => (
            <BlogCard
              excerpt={post.excerpt as string}
              feature_image={post.feature_image as string}
              primary_tag={post.primary_tag?.name as string}
              title={post.title as string}
              key={index}
              slug={post.slug}
            />
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}
