import { limitChars } from '@/utils/string';

import { Chip, Stack, Tooltip } from '@mui/material';

import ExtraTags from './extra-tags';

type Props = {
  tags: string[];
};

export function Tag({ tag }: { tag: string }) {
  const isLarge = tag.length > 10;
  if (isLarge) {
    return (
      <Tooltip title={tag}>
        <Chip label={limitChars(tag, 10)} size="small" />
      </Tooltip>
    );
  }
  return <Chip label={tag} size="small" />;
}

export default function Tags({ tags }: Props) {
  const firstTwoTags = tags.slice(0, 2);
  const remainingTags = tags.slice(2);

  return (
    <Stack direction="row" gap={1}>
      {firstTwoTags.map((tag: any, index: number) => (
        <Tag tag={tag} key={index} />
      ))}
      {remainingTags.length > 0 && <ExtraTags tags={remainingTags} />}
    </Stack>
  );
}
