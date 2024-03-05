'use client';
import { DOCS_BASE_URL } from '@/constants/docs';
import externalLinks from '@/constants/externalLinks';
import routes from '@/constants/routes';
import { currentEnv } from '@/utils/env';

import LogoDiscord from '../icons/logo-discord';
import LogoGithub from '../icons/logo-github';
import LogoLinkedin from '../icons/logo-linkedin';
import LogoSubstrack from '../icons/logo-substrack';
import LogoTwitter from '../icons/logo-twitter';

export const linksSocial = [
  {
    icon: LogoTwitter,
    href: externalLinks.gateway_twitter,
  },
  {
    icon: LogoDiscord,
    href: externalLinks.gateway_discord,
  },
  {
    icon: LogoLinkedin,
    href: externalLinks.gateway_linkedin,
  },
  {
    icon: LogoSubstrack,
    href: externalLinks.gateway_substack,
  },
  {
    icon: LogoGithub,
    href: externalLinks.gateway_github,
  },
];

export const linksList: { title: string; href: string; target: string }[] = [
  {
    title: 'Explorer',
    href: routes.explorer.root,
    target: '_self',
  },
  {
    title: 'Dashboard',
    href: routes.auth,
    target: '_self',
  },
  {
    title: 'Privacy Policy',
    href: `/privacy-policy`,
    target: '_blank',
  },
  {
    title: 'Terms of Service',
    href: `/terms-of-service`,
    target: '_blank',
  },
  {
    title: 'Brand Kit',
    href: externalLinks.gateway_brandkit,
    target: '_blank',
  },
];
