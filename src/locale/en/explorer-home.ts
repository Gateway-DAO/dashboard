import routes from '@/constants/routes';

export const explorer_home = {
  title: 'Explore transactions and interact with the protocol',
  banners: [
    {
      title: 'Check a transaction',
      description:
        'Transactions serve as a comprehensive audit trail, meticulously recording all activities performed at the protocol layer.',
      link_text: 'Check it out',
      link: routes.explorer.transactions,
      target: '_self',
    },
    {
      title: 'Upload Data',
      description:
        "Store data to your users' Encrypted Data Vaults (EDVs) to enable ownership and portability of information. The data can be structured or unstructured.",
      link_text: 'Check it out',
      link: routes.explorer.dataModels,
      target: '_self',
    },
    {
      title: 'Request Data"',
      description:
        "Leverage data in your user's Encrypted Data Vaults (EDVs) in a secure and private manner.",
      link_text: 'Check it out',
      link: routes.explorer.requestTemplates,
      target: '_self',
    },
  ],
  data_models: 'Featured data models',
  request_templates: 'Featured data request templates',
};
