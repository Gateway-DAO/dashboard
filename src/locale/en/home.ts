import { DOCS_BASE_URL } from '@/constants/docs';
import documentationRoutes from '@/constants/documentationRoutes';
import routes from '@/constants/routes';

export const home = {
  greeting: 'Hello',
  main_banner: {
    title: 'Learn about Gateway Protocol',
    subtitle:
      'Our guide to learn about the Gateway architecture, mission, and set up process.',
    btn_text: 'Check out it',
    link: documentationRoutes.home,
  },

  sub_banner: [
    {
      title: 'How to issue Private Data Assets',
      subtitle: 'Read about how to issue with our API.',
      btn_text: 'Read now',
      link: documentationRoutes.startIssuing,
    },
    {
      title: 'Start building',
      subtitle: 'Jump  into our playground and use our API',
      btn_text: 'Build now',
      link: routes.dashboardUserPlayground,
    },
  ],
};
