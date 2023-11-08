import routes from '@/constants/routes';

export const explorer_home = {
  title: 'Explore transactions and interact with the protocol',
  banners: [
    {
      title: 'Check a transaction',
      description:
        'Transactions function as a comprehensive audit trail, meticulously recording all activities executed on the protocol layer. This ensures transparency and traceability, allowing for a detailed review of interactions within the system. The integrity and security of the protocol are bolstered by this immutable record, which is crucial for maintaining user trust and facilitating regulatory compliance.',
      link_text: 'Check out it',
      link: routes.explorer.transactions,
      target: '_self',
    },
    {
      title: 'Explore data models',
      description:
        'Data models serve as foundational templates for Private Data Assets (PDAs). Each PDA created using a data model adheres to a standardized structure of claims, making these frameworks exceptionally reusable for various related scenarios.',
      link_text: 'Check out it',
      link: routes.explorer.dataModels,
      target: '_self',
    },
    {
      title: `Start to verify user's data`,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
      link_text: 'Check out it',
      link: routes.explorer.dataRequestTemplates,
      target: '_self',
    },
  ],
};
