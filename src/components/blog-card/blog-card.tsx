import Image from 'next/image';
import Link from 'next/link';

import { PostOrPage } from '@tryghost/content-api';
import dayjs from 'dayjs';
import DefaultImage from 'public/social.png';
import { titleCase } from 'title-case';

import { Box, Card, CardActionArea, Chip, Typography } from '@mui/material';

export default function BlogCard({
  feature_image,
  feature_image_alt,
  title,
  created_at,
  slug,
  primary_tag,
}: PostOrPage) {
  return (
    <Card
      variant="outlined"
      sx={{
        flex: 1,
      }}
    >
      <CardActionArea
        component={Link}
        href={`/blog/${slug}`}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          p: 3,
          height: '100%',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            inset: 0,
            aspectRatio: 373 / 211,
            width: '100%',
            backgroundColor: 'primary.main',
            mb: 3,
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <Image
            src={feature_image ?? DefaultImage}
            alt={feature_image_alt || title || 'blog post image'}
            fill
          />
        </Box>
        {!!primary_tag?.name && (
          <Chip
            size="small"
            variant="outlined"
            label={titleCase(primary_tag.name)}
            sx={{ mb: 2 }}
          />
        )}
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          sx={{ mb: 1, flexGrow: 1 }}
        >
          {title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {dayjs(created_at).format('MMM DD, YYYY')}
        </Typography>
      </CardActionArea>
    </Card>
  );
}
