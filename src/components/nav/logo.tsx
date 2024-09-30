'use client';
import { PropsWithChildren } from 'react';

import routes from '@/constants/routes';

import Logo from '../logo/logo';
import { useNavContext } from './context';
import { logoTranslateColor } from './types';

export default function NavLogo({
  children,
  href,
}: PropsWithChildren<{ href?: string }>) {
  const { color, isScrolled } = useNavContext();

  return (
    <Logo
      href={href ?? routes.home}
      theme={isScrolled ? 'light' : logoTranslateColor[color]}
    >
      {children}
    </Logo>
  );
}
