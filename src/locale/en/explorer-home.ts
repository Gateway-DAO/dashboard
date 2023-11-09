import routes from '@/constants/routes';

export const explorer_home = {
  title: 'Explore transactions and interact with the protocol',
  banners: [
    {
      title: 'Check a transaction',
      description:
        'Transactions serve as a comprehensive audit trail, meticulously recording all activities performed at the protocol layer.',
      link_text: 'Check out it',
      link: routes.explorer.transactions,
      target: '_self',
    },
    {
      title: 'Explore Data Models',
      description:
        'Each PDA issued using a data model adheres to a standardized structure of claims, making these frameworks exceptionally reusable for various related scenarios.',
      link_text: 'Check out it',
      link: routes.explorer.dataModels,
      target: '_self',
    },
    {
      title: 'Explore Data Request Templates',
      description:
        'Data Request Templates serve as the foundational blueprint for each Data Request, ensuring a uniform structure and standardized format for each inquiry.',
      link_text: 'Check out it',
      link: routes.explorer.dataRequestTemplates,
      target: '_self',
    },
  ],
  data_models: 'Featured data models',
};
