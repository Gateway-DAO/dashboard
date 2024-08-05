import Image from 'next/image';
import Link from 'next/link';

import { PostOrPage } from '@tryghost/content-api';
import DefaultImage from 'public/social.png';

import { ChevronRight } from '@mui/icons-material';
import { Stack, Typography, Button, CardActionArea } from '@mui/material';

export default function BlogCard({
  title,
  feature_image,
  primary_tag,
  excerpt,
  slug,
  feature_image_alt,
}: PostOrPage) {
  return (
    <Stack direction={'column'}>
      <Link
        href={`/blog/${slug}`}
        style={{
          textDecoration: 'none',
          color: '#771AC9',
        }}
      >
        <Image
          style={{
            aspectRatio: '16/9',
            objectFit: 'cover',
            borderRadius: '8px',
          }}
          src={feature_image || DefaultImage}
          alt={feature_image_alt || title || 'blog post image'}
          width={560}
          height={300}
          layout="responsive"
        />
        {!!primary_tag?.name && (
          <Button
            variant="text"
            size="medium"
            sx={{
              width: primary_tag.name.length < 5 ? '10%' : '20%',
              mt: 2,
              '&:hover': {
                backgroundColor: '#fff',
              },
              bgcolor: '#fff',
            }}
          >
            {primary_tag.name}
          </Button>
        )}

        <Typography
          fontWeight={700}
          fontSize={'22px'}
          lineHeight={'28px'}
          color={'#000'}
          sx={{ mt: primary_tag === undefined ? 8 : 1.5 }}
        >
          {title}
        </Typography>
        {excerpt && (
          <Typography
            fontWeight={500}
            fontSize={'16px'}
            lineHeight={'24px'}
            color={'#000'}
            sx={{ mt: 1 }}
          >
            {excerpt.length > 90 ? excerpt.substring(0, 150) + '...' : excerpt}
          </Typography>
        )}

        <Stack direction={'row'}>
          <Typography>Read more</Typography>
          <ChevronRight />
        </Stack>
      </Link>
    </Stack>
  );
}
