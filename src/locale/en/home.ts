import documentationRoutes from '@/constants/documentationRoutes';
import routes from '@/constants/routes';

export const home = {
  greeting: 'Hello',
  main_banner: {
    title: 'Learn about Gateway',
    subtitle:
      'Our guide to learn about the Gateway architecture, mission, and set up process.',
    btn_text: 'Check it out',
    link: documentationRoutes.home,
  },
  issue_banner: {
    title: 'Start issuing a Private Data Asset',
    subtitle:
      'Select a data model, fill the details and just send to the user all under 30 seconds',
    btn_text: 'Issue now',
    target: '_blank',
  },
  sub_banner: [
    {
      heading: 'For organizations',
      title: 'Create an Organization',
      subtitle:
        'To issue and verify on behalf of an organization, its essential to set up one.',
      btn_text: 'Create Organization ID',
      link: routes.dashboard.createOrg,
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
      heading: 'About',
      title: 'Learn about Gateway Network',
      subtitle:
        'Our guide to learn about the Gateway architecture, mission, and set up process.',
      btn_text: 'Learn more',
      link: documentationRoutes.home,
      target: '_blank',
    },
  ],
  instrunction_banner: [
    {
      title: 'How to use your PDA',
      description: 'Explore the potential of your Data Assets',
      link: 'https://youtube.com/embed/GwIFrE0MQLc',
    },
    {
      title: 'How to issue a PDA',
      description: 'How to issue a PDA using a Data Model',
      link: 'https://youtube.com/embed/_2_HmB76d40',
    },
    {
      title: 'How to create a Request',
      description: 'How to create a request from a template',
      link: 'https://youtube.com/embed/7ihrltA9McM',
    },
  ],
  play_video: 'Play video',
};
