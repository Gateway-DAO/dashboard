export const revalidate = 1200;

import { Metadata } from 'next';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import BlogCard from '@/components/blog-card/blog-card';
import routes from '@/constants/routes';
import { getSinglePost, getPosts } from '@/services/ghost';
import { LANDING_NAVBAR_HEIGHT } from '@/theme/config/style-tokens';
import { PostOrPage } from '@tryghost/content-api';
import { titleCase } from 'title-case';

import { Box, Container, Stack, Typography, Chip, Avatar } from '@mui/material';

import ShareButtonFn from '../components/share-card';
import { blogMetadata } from '../utils';
import { RenderBlog } from './component/render-blog';

import DefaultImage from '/public/social.png';

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

  return `${month} ${day}, ${year}`;
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

  const tags =
    metaData?.tags?.filter((item) => item.name).map((item) => item.name) ?? [];

  return {
    ...blogMetadata,
    title: `${metaData.title} | Gateway Blog`,
    description: metaData.excerpt,
    keywords: [...(tags as string[]), ...blogMetadata.keywords],
    openGraph: {
      ...blogMetadata.openGraph,
      title: metaData.title,
      description: metaData.excerpt,
      url: metaData.url,
      images: [
        {
          url: metaData.feature_image || '/social.png',
        },
      ],
      type: 'website',
    },
    authors:
      metaData?.authors?.map((author) => {
        return { name: author.name };
      }) || null,
    twitter: {
      ...blogMetadata.twitter,
      title: metaData.title,
      description: metaData.excerpt,
      images: [
        {
          url: metaData.feature_image || '/social.png',
        },
      ],
    },
  };
}

export default async function Read({ params }: { params: { slug: string } }) {
  const data = await getSinglePost(params.slug);
  if (!data) {
    redirect(routes.blog);
  }
  const {
    id,
    title,
    primary_tag,
    primary_author,
    published_at,
    reading_time,
    feature_image,
    feature_image_alt,
    feature_image_caption,
    html,
  } = data;
  // Fetch latest posts from same tag
  const latestPosts: PostOrPage[] = await getPosts(3, {
    ignoreIds: [id],
    tag: primary_tag?.slug,
  });
  // Fetch more latests posts if tag has less than 3 posts
  if (latestPosts.length < 3) {
    const posts = await getPosts(3 - latestPosts.length, {
      ignoreIds: [id, ...latestPosts.map((post) => post.id)],
    });
    posts.forEach((post) => {
      latestPosts.push(post);
    });
  }

  return (
    <Container
      component="article"
      sx={{
        ...LANDING_NAVBAR_HEIGHT,
      }}
    >
      <Stack
        sx={{
          pt: {
            xs: 0,
            md: 7,
          },
        }}
      >
        <Stack
          component="header"
          alignSelf="center"
          maxWidth={662}
          width="100%"
        >
          {!!primary_tag?.name && (
            <Chip
              variant="outlined"
              label={titleCase(primary_tag.name)}
              sx={{ alignSelf: 'flex-start', mb: 1 }}
            />
          )}
          <Typography
            sx={{
              typography: {
                xs: 'h4',
                md: 'h2',
              },
            }}
            gutterBottom
          >
            {title}
          </Typography>
          <Stack
            mt={3}
            display="flex"
            justifyContent="space-between"
            flexDirection={{ xs: 'column', md: 'row' }}
          >
            <Stack alignSelf="flex-start" flexDirection="row">
              <Avatar
                alt="Gateway"
                src={
                  primary_author?.profile_image ?? '/images/default-user.svg'
                }
              />
              <Stack ml={2}>
                <Typography variant="subtitle2">
                  {primary_author?.name}
                </Typography>
                <Typography variant="body2">
                  {formatDate(new Date(published_at as string))}. {reading_time}{' '}
                  Min Read
                </Typography>
              </Stack>
            </Stack>
            <Stack mt={{ md: 0, xs: 2 }} alignSelf="center">
              <ShareButtonFn title={title} />
            </Stack>
          </Stack>
        </Stack>

        <Stack component="main">
          <Stack
            component="figure"
            sx={{
              mx: {
                xs: -3,
                md: -6,
                lg: 0,
              },
              mb: 0,
              mt: 8,
            }}
          >
            <Box
              alignSelf="center"
              position="relative"
              width="100%"
              sx={{
                aspectRatio: '16 / 9',
                borderRadius: {
                  xs: 0,
                  lg: 1,
                },
                overflow: 'hidden',
              }}
            >
              <Image
                fill={true}
                src={feature_image || DefaultImage}
                alt={feature_image_alt || title || 'Blog post image'}
              />
            </Box>
            <Stack
              alignSelf="center"
              marginTop={2}
              color={'text.secondary'}
              direction="row"
              component="figcaption"
              dangerouslySetInnerHTML={{
                __html: feature_image_caption as string,
              }}
            ></Stack>
          </Stack>
          <Box sx={{ maxWidth: 664, alignSelf: 'center', mt: 8 }}>
            <RenderBlog renderHtml={html as string} />
          </Box>
        </Stack>
      </Stack>
      <Stack
        component="footer"
        mt={7}
        pb={{
          xs: 4,
          md: 15,
        }}
      >
        <Typography
          sx={{
            typography: {
              xs: 'h4',
              md: 'h3',
            },
          }}
        >
          Read more
        </Typography>
        <Stack
          gap={3}
          mt={6}
          display="grid"
          sx={{
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            },
          }}
        >
          {latestPosts.map((post) => (
            <BlogCard key={post.id} {...post} />
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}
