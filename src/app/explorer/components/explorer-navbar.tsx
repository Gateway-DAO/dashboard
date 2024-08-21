'use client';
import { usePathname } from 'next/navigation';

import NavLogo from '@/components/nav/logo';
import Nav from '@/components/nav/nav';
import { NavLink } from '@/components/nav/types';
import documentationRoutes from '@/constants/documentationRoutes';
import externalLinks from '@/constants/externalLinks';
import routes from '@/constants/routes';
import { isSandbox } from '@/utils/env';

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
  const sandboxButton: NavLink = {
    label: isSandbox ? 'Sandbox' : 'Testnet',
    variant: 'outlined',
    href: `${externalLinks.gateway}${pathname}`,
  };

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
