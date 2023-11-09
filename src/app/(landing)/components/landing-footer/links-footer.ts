import { DOCS_BASE_URL } from '@/constants/docs';
import routes from '@/constants/routes';

import LogoDiscord from '../icons/logo-discord';
import LogoGithub from '../icons/logo-github';
import LogoLinkedin from '../icons/logo-linkedin';
import LogoSubstrack from '../icons/logo-substrack';
import LogoTwitter from '../icons/logo-twitter';

export const linksSocial = [
  {
    icon: LogoTwitter,
    href: 'https://twitter.com/gateway_xyz',
  },
  {
    icon: LogoDiscord,
    href: 'https://discord.gg/tgt3KjcHGs',
  },
  {
    icon: LogoLinkedin,
    href: 'https://www.linkedin.com/company/mygateway/',
  },
  {
    icon: LogoSubstrack,
    href: 'https://mygateway.substack.com/',
  },
  {
    icon: LogoGithub,
    href: 'https://github.com/Gateway-DAO',
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
    title: 'Privacy',
    href: `${DOCS_BASE_URL}docs/privacy-security-standards`,
    target: '_blank',
  },

  {
    title: 'Brand Kit',
    href: 'https://live.standards.site/gateway',
    target: '_blank',
  },
];
