'use client';

import { Tag } from '@tryghost/content-api';
import { useQueryState } from 'nuqs';

import { Chip, Stack } from '@mui/material';

type Props = {
  tags: Tag[];
};

export default function TagList({ tags }: Props) {
  const [selectedTag, setTag] = useQueryState('tag');

  return (
    <Stack
      direction="row"
      gap={1}
      sx={{
        flexWrap: 'nowrap',
        overflowX: 'auto',
        mx: {
          xs: -3,
          md: -6,
          lg: 0,
        },
        px: {
          xs: 3,
          md: 6,
          lg: 0,
        },
        mb: {
          xs: 4,
          md: 6,
        },
      }}
    >
      <Chip
        label="All"
        variant={!selectedTag ? 'filled' : 'outlined'}
        onClick={() => setTag(null)}
      />
      {tags.map((tag) => (
        <Chip
          key={tag.slug}
          label={tag.name}
          variant={selectedTag === tag.slug! ? 'filled' : 'outlined'}
          onClick={() => setTag(tag.slug)}
        />
      ))}
    </Stack>
  );
}
