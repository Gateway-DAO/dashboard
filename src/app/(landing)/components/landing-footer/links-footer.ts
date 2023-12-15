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

export const linksList = [
  {
    title: 'Learn',
    href: routes.learn,
    target: '_self',
  },
  {
    title: 'Build',
    href: routes.build,
    target: '_self',
  },
  {
    title: 'Dashboard',
    href: routes.auth,
    target: '_self',
  },
  {
    title: currentEnv() === 'production' ? 'Sandbox' : 'MainNet',
    href:
      currentEnv() === 'production'
        ? externalLinks.gateway_sandbox
        : externalLinks.gateway,
    target: '_blank',
  },
  {
    title: 'Privacy',
    href: `${DOCS_BASE_URL}docs/privacy-security-standards`,
    target: '_blank',
  },

  {
    title: 'Brand Kit',
    href: externalLinks.gateway_brandkit,
    target: '_blank',
  },
];
