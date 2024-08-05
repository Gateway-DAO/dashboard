'use client';

import documentationRoutes from '@/constants/documentationRoutes';
import routes from '@/constants/routes';

export const links = [
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
