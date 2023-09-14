'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { IconButton } from '@mui/material';

type Props = {
  href?: string;
};

export default function BackButton({ href: propHref }: Props) {
  const router = useRouter();
  const [href, setHref] = useState<string>();

  useEffect(() => {
    if (propHref && !document.referrer.startsWith(window.location.origin)) {
      setHref(propHref);
    }
  }, [propHref]);

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
      sx={{ backgroundColor: 'action.selected' }}
    >
      <ChevronLeftIcon sx={{ color: 'text.secondary' }} />
    </IconButton>
  );
}
