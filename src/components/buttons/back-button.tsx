'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { IconButton, SxProps, Theme } from '@mui/material';

type Props = {
  href?: string;
  sx?: SxProps<Theme>;
};

export default function BackButton({ href, sx }: Props) {
  const router = useRouter();

  return (
    <IconButton
      {...(href
        ? {
            component: Link,
            href,
          }
        : {
            onClick: router.back,
          })}
      sx={{ backgroundColor: 'action.selected', ...sx }}
    >
      <ChevronLeftIcon sx={{ color: 'text.secondary' }} />
    </IconButton>
  );
}
