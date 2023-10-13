import routes from '@/constants/routes';

export const home = {
  greeting: 'Hello',
  main_banner: {
    title: 'Get started using the API',
    subtitle:
      'This a guide for authenticating and the pre-work before using API',
    btn_text: 'Check out it',
    link: 'https://docs.mygateway.xyz/docs/get-started-here',
  },

  sub_banner: [
    {
      title: 'Start issuing a private data asset',
      subtitle: 'Start your journey as an issuer',
      btn_text: 'Check out it',
      link: 'https://docs.mygateway.xyz/docs/start-issuing',
    },
    {
      title: 'Start playing with playground',
      subtitle: 'Put your hands on and start playing with our API',
      btn_text: 'Check out it',
      link: routes.dashboardUserPlayground,
    },
  ],
};
