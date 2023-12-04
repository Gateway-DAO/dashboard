'use client';

import { Button, Chip, Skeleton, Typography } from '@mui/material';
import { Stack } from '@mui/system';

type Props = {
  link: string;
  title: string;
  description: string;
};

export default function InstructionHeader({ link, title, description }: Props) {
  return (
    <Stack sx={{ height: '100%' }}>
      <Stack mt={3} mb={5} sx={{ height: '100%' }}>
        <Typography variant="h4" mb={1}>
          {title}
        </Typography>

        <Typography variant="body1">{description}</Typography>
      </Stack>
      <Stack direction="column" sx={{ height: '100%' }}>
        <iframe src={link} width={'100%'} height={'100%'}></iframe>
      </Stack>
    </Stack>
  );
}
