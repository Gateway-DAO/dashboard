'use client';
import { usePathname } from 'next/navigation';

import NavLogo from '@/components/nav/logo';
import Nav from '@/components/nav/nav';
import { NavLink } from '@/components/nav/types';
import documentationRoutes from '@/constants/documentationRoutes';
import routes from '@/constants/routes';

import { Chip } from '@mui/material';

const links: NavLink[] = [
  { label: 'Transactions', href: routes.explorer.transactions },
  { label: 'Data Models', href: routes.explorer.dataModels },
  { label: 'Sign Message', href: routes.explorer.requestTemplates },
  {
    label: 'Docs',
    href: documentationRoutes.home,
    target: '_blank',
    externalIcon: true,
  },
];

const openDashboardButton: NavLink = {
  label: 'Open dashboard',
  href: routes.auth,
  variant: 'contained',
  color: 'primary',
};

export default function ExplorerNavbar() {
  const pathname = usePathname();

  return (
    <Nav
      compact
      logo={
        <NavLogo>
          <Chip
            size="small"
            color="primary"
            label="Explorer"
            sx={{ ml: 1, fontWeight: 700 }}
          />
        </NavLogo>
      }
      color="black"
      links={links}
      buttons={[openDashboardButton]}
      hamburgerButtons={[openDashboardButton]}
    />
  );
}
