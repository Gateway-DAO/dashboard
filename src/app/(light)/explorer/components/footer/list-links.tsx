import { DOCS_BASE_URL } from '@/constants/docs';
import routes from '@/constants/routes';
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa';
import { SiSubstack } from 'react-icons/si';

import { LinkedIn } from '@mui/icons-material';

export const socialsLinks = [
  {
    icon: FaTwitter,
    href: 'https://twitter.com/gateway_xyz',
    name: 'Twitter',
  },
  {
    icon: FaDiscord,
    href: 'https://discord.gg/tgt3KjcHGs',
    name: 'Discord',
  },
  {
    icon: LinkedIn,
    href: 'https://www.linkedin.com/company/mygateway/',
    name: 'LinkedIn',
  },
  {
    icon: SiSubstack,
    href: 'https://mygateway.substack.com/',
    name: 'Substack',
  },
  {
    icon: FaGithub,
    href: 'https://github.com/Gateway-DAO',
    name: 'Github',
  },
];

export const listLinks = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Learn',
    href: routes.learn,
  },
  {
    title: 'Build',
    href: routes.build,
  },
  {
    title: 'Explorer',
    href: routes.explorer,
  },
  {
    title: 'Dashboard',
    href: routes.auth,
  },
  {
    title: 'Privacy',
    href: `${DOCS_BASE_URL}docs/privacy-security-standards`,
  },
  {
    title: 'Brand Kit',
    href: 'https://live.standards.site/gateway',
  },
  {
    title: 'Contact',
    href: 'mailto:ayyan@mygateway.xyz?subject=Contact Us',
  },
];
