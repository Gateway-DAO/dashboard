import documentationRoutes from '@/constants/documentationRoutes';
import routes from '@/constants/routes';

export const home = {
  greeting: 'Hello',
  main_banner: {
    title: 'Learn about Gateway',
    subtitle:
      'Our guide to learn about the Gateway architecture, mission, and set up process.',
    btn_text: 'Check out it',
    link: documentationRoutes.home,
  },

  sub_banner: [
    {
      heading: 'For organizations',
      title: 'Create an Orgainzation',
      subtitle:
        'To issue and verify on behalf of an organization, its essential to set up one.',
      btn_text: 'Create Organization ID',
      link: `${routes.dashboard.org.root}/`,
      target: '_self',
    },
    {
      heading: 'For developers',
      title: 'Getting started using the protocol',
      subtitle: 'Find out what you need to know to start using the API.',
      btn_text: 'Get started',
      link: documentationRoutes.home,
      target: '_blank',
    },
    {
      heading: 'For issuers',
      title: 'Start issuing a Private Data Asset',
      subtitle: 'Step-by-step guide for issuing PDA and become an issuer.',
      btn_text: 'Learn more',
      link: documentationRoutes.startIssuing,
      target: '_blank',
    },
  ],
};
