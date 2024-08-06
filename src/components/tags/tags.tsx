import { Chip, Stack } from '@mui/material';

type Props = {
  tags: string[];
};

export default function Tags({ tags }: Props) {
  return (
    <>
      {tags?.length > 0 && (
        <Stack direction="row" gap={1} sx={{ mt: 1 }}>
          {tags.map((tag: any, index: number) => (
            <Chip label={tag} key={index} size="small" />
          ))}
        </Stack>
      )}
    </>
  );
}
