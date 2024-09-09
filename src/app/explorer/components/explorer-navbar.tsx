'use client';

import { useSession } from 'next-auth/react';
import { Suspense, useState } from 'react';

import AuthenticationWalletModals from '@/app/components/authentication-wallet-modals';
import NavLogo from '@/components/nav/logo';
import Nav from '@/components/nav/nav';
import { NavLink } from '@/components/nav/types';
import documentationRoutes from '@/constants/documentationRoutes';
import routes from '@/constants/routes';
import WalletConnectionProvider from '@/services/wallets/wallet-connection-provider';

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

export default function ExplorerNavbar() {
  const [isModalWaleltOpen, setIsModalWaleltOpen] = useState(false);
  const session = useSession();
  const primaryButton: NavLink = {
    label: 'Open dashboard',
    variant: 'outlined',
    ...(session.status === 'authenticated'
      ? { href: routes.dashboard.storage }
      : { onClick: () => setIsModalWaleltOpen(true) }),
  };
  return (
    <>
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
        buttons={[primaryButton]}
        hamburgerButtons={[primaryButton]}
      />
      <Suspense fallback={null}>
        <WalletConnectionProvider>
          <AuthenticationWalletModals
            isOpen={isModalWaleltOpen}
            onCancel={() => setIsModalWaleltOpen(false)}
          />
        </WalletConnectionProvider>
      </Suspense>
    </>
  );
}
