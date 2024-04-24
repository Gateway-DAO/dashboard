import Image from 'next/image';
import Link from 'next/link';

import { getPosts } from '@/services/server-functions/ghost-client';

import { Button, Typography, Stack } from '@mui/material';

export default async function HeroPost() {
  const posts = await getPosts(1);

  const excerpt = posts[0]?.excerpt;
  const title = posts[0].title;
  return (
    <Link
      href={`/blog/${posts[0].slug}`}
      style={{
        textDecoration: 'none',
        color: '#771AC9',
        width: '78.7%',
        marginTop: 100,
      }}
    >
      <Stack direction={{ xs: 'column', md: 'row' }}>
        <Stack alignSelf={'center'} sx={{ width: { md: '130%' } }}>
          <Image
            src={posts[0].feature_image as string}
            alt={posts[0].title as string}
            style={{
              aspectRatio: '16/9',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
            width={560}
            height={300}
            layout="responsive"
          />
        </Stack>

        <Stack direction={'column'} sx={{ ml: { md: 8 } }}>
          <div>
            {posts[0].primary_tag?.name !== undefined && (
              <Button
                variant="text"
                size="medium"
                sx={{
                  width: '20%',
                  mt: 2,
                  '&:hover': {
                    backgroundColor: '#fff',
                  },
                  bgcolor: '#fff',
                }}
              >
                {posts[0].primary_tag?.name}
              </Button>
            )}
          </div>
          <Typography
            variant="h4"
            fontWeight={700}
            color={'#000'}
            sx={{ mt: posts[0].primary_tag?.name === undefined ? 3 : 1.5 }}
          >
            {title && title.length > 50
              ? title.substring(0, 60) + '...'
              : title}
          </Typography>
          <Typography
            fontWeight={400}
            variant="h6"
            color={'#000'}
            sx={{ mt: 1 }}
          >
            {excerpt && excerpt.length > 90
              ? excerpt.substring(0, 150) + '...'
              : excerpt}
          </Typography>
        </Stack>
      </Stack>
    </Link>
  );
}
