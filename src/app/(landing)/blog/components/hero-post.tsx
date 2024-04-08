import Link from 'next/link';
import Image from 'next/image';
import { Button, Typography, Stack } from '@mui/material';
import { getPosts } from '@/services/server-functions/ghost-client';

export default async function HeroPost() {
  const posts = await getPosts(1);
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
        <Stack sx={{ width: { md: '63.5%' } }}>
          <Image
            src={posts[0].feature_image as string}
            alt={posts[0].title as string}
            width={560}
            height={295}
            layout="responsive"
          />
        </Stack>

        <Stack direction={'column'} sx={{ ml: { md: 8 } }}>
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
          <Typography
            fontWeight={700}
            fontSize={'45px'}
            lineHeight={'52px'}
            color={'#000'}
            sx={{ mt: 1.5 }}
          >
            {posts[0].title}
          </Typography>
          <Typography
            fontWeight={400}
            fontSize={'24px'}
            lineHeight={'32px'}
            color={'#000'}
            sx={{ mt: 1 }}
          >
            {posts[0].excerpt}
          </Typography>
        </Stack>
      </Stack>
    </Link>
  );
}
