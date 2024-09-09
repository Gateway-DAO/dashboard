import Image from 'next/image';
import Link from 'next/link';

import { EXTENDED_MONTH_FORMAT } from '@/constants/date';
import { PostOrPage } from '@tryghost/content-api';
import dayjs from 'dayjs';
import { titleCase } from 'title-case';

import { Typography, Stack, Box, Chip } from '@mui/material';

import DefaultImage from '/public/social.png';

export default function HeroPost({
  slug,
  primary_tag,
  feature_image,
  feature_image_alt,
  title,
  created_at,
}: PostOrPage) {
  return (
    <Stack
      component={Link}
      href={`/blog/${slug}`}
      sx={{
        gap: 5,
        textDecoration: 'none',
        color: 'text.primary',
      }}
      direction={{
        xs: 'column-reverse',
        lg: 'row',
      }}
    >
      <Stack alignItems="flex-start">
        {!!primary_tag?.name && (
          <Chip
            variant="outlined"
            label={titleCase(primary_tag.name)}
            sx={{ mb: 1 }}
          />
        )}
        <Typography
          variant="h2"
          color="text.primary"
          component="span"
          sx={{
            mb: 1,
            typography: {
              xs: 'h4',
              lg: 'h2',
            },
            fontWeight: 'lighter!important',
            ':hover': {
              textDecoration: 'underline',
            },
          }}
        >
          {title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {dayjs(created_at).format(EXTENDED_MONTH_FORMAT)}
        </Typography>
      </Stack>
      <Box
        sx={{
          height: '100%',
          overflow: 'hidden',
          position: 'relative',
          inset: 0,
          aspectRatio: 777 / 433,
          borderRadius: 1,
          flexShrink: 0,
          width: {
            xs: '100%',
            lg: 777,
          },
        }}
      >
        <Image
          src={(feature_image as string) || DefaultImage}
          alt={feature_image_alt || (title as string) || 'blog post image'}
          placeholder="empty"
          quality={100}
          fill
          sizes="(max-width: 768px) 1000px, 100vw"
          style={{
            objectFit: 'cover',
            objectPosition: 'center bottom',
          }}
        />
      </Box>
    </Stack>
  );
}
