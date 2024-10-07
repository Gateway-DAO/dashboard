import { ComponentProps } from 'react';

import NavLogo from '@/components/nav/logo';
import Nav from '@/components/nav/nav';
import { NavLink } from '@/components/nav/types';
import documentationRoutes from '@/constants/documentationRoutes';
import routes from '@/constants/routes';

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
  // {
  //   label: 'Ecosystem',
  //   href: routes.ecosystem,
  // },
  {
    label: 'Explorer',
    href: routes.explorer.root,
  },
];

type Props = Pick<ComponentProps<typeof Nav>, 'color'>;

const primaryButton: NavLink = {
  label: 'Open dashboard',
  href: routes.auth,
  variant: 'outlined',
};
const secondaryButton: NavLink = {
  label: 'Read documentation',
  href: documentationRoutes.home,
  target: '_blank',
  variant: 'contained',
  hideOnMobile: true,
};

export default function MainNavbar({ color }: Props) {
  return (
    <Nav
      logo={<NavLogo />}
      color={color}
      links={links}
      buttons={[primaryButton, secondaryButton]}
      hamburgerButtons={[primaryButton]}
    />
  );
}
