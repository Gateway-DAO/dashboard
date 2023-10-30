'use client';
import NextLink from 'next/link';
import { PropsWithChildren } from 'react';

import routes from '@/constants/routes';
import useOrganization from '@/hooks/use-organization';

import { Link } from '@mui/material';

export default function LogoContainer({ children }: PropsWithChildren) {
  const { isOrg, pathnameOrg } = useOrganization();
  const link = isOrg
    ? routes.dashboard.org.home(pathnameOrg)
    : routes.dashboard.user.home;

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
      href={link}
      alignItems={'center'}
    >
      {children}
    </Link>
  );
}
