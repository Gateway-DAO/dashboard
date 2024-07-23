import NextLink from 'next/link';
import { PropsWithChildren } from 'react';

import routes from '@/constants/routes';

import { Link } from '@mui/material';

export default function LogoContainer({ children }: PropsWithChildren) {
  return (
    <Link
      component={NextLink}
      sx={{
        flexDirection: 'row',
        display: 'flex',
        textDecoration: 'none',
        flex: 1,
        marginRight: 1,
      }}
      href={routes.dashboard.user.home}
      alignItems={'center'}
    >
      {children}
    </Link>
  );
}
