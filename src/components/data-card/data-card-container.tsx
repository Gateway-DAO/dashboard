import Link from 'next/link';
import { PropsWithChildren } from 'react';

import { Stack, CardActionArea, SxProps } from '@mui/material';

type Props = {
  href?: string;
  sx?: SxProps;
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
  sx,
  children,
}: PropsWithChildren<Props>) {
  const sxProps = { ...style, ...(sx && sx) };
  if (!!href) {
    return (
      <CardActionArea component={Link} href={href} sx={sxProps}>
        {children}
      </CardActionArea>
    );
  }

  return <Stack sx={style}>{children}</Stack>;
}
