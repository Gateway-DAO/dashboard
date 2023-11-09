import Link from 'next/link';
import { PropsWithChildren } from 'react';

import { Stack, CardActionArea, SxProps } from '@mui/material';

type Props = {
  href?: string;
};
const style: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'space-between',
  gap: 3,
  p: 2,
  height: '100%',
};

export default function CardContainer({
  href,
  children,
}: PropsWithChildren<Props>) {
  if (!!href) {
    return (
      <CardActionArea component={Link} href={href} sx={style}>
        {children}
      </CardActionArea>
    );
  }

  return <Stack sx={style}>{children}</Stack>;
}
