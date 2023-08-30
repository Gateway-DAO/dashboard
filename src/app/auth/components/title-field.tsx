import { Stack, Typography } from '@mui/material';

type Props = {
  title: string;
  subtitle?: string;
};

export function TitleSubtitleField({ title, subtitle = '' }: Props) {
  return (
    <Stack>
      <Typography component="h2" variant="h6" fontSize={16}>
        {title}
      </Typography>
      <Typography component="p" variant="caption">
        {subtitle}
      </Typography>
    </Stack>
  );
}
