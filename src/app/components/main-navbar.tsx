'use client';

import { useSession } from 'next-auth/react';
import { ComponentProps, Suspense, useState } from 'react';

import NavLogo from '@/components/nav/logo';
import Nav from '@/components/nav/nav';
import { NavLink } from '@/components/nav/types';
import documentationRoutes from '@/constants/documentationRoutes';
import routes from '@/constants/routes';
import WalletConnectionProvider from '@/services/wallets/wallet-connection-provider';

import AuthenticationWalletModals from './authentication-wallet-modals';

const links = [
  {
    label: 'Docs',
    href: documentationRoutes.home,
    target: '_blank',
  },
  {
    label: 'Blog',
    href: routes.blog,
  },
  {
    label: 'Ecosystem',
    href: routes.ecosystem,
  },
  {
    label: 'Explorer',
    href: routes.explorer.root,
  },
];

type Props = Pick<ComponentProps<typeof Nav>, 'color'>;

const secondaryButton: NavLink = {
  label: 'Read documentation',
  href: documentationRoutes.home,
  target: '_blank',
  variant: 'contained',
  hideOnMobile: true,
};

export default function MainNavbar({ color }: Props) {
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
        logo={<NavLogo />}
        color={color}
        links={links}
        buttons={[primaryButton, secondaryButton]}
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
