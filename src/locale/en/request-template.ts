import documentationRoutes from '@/constants/documentationRoutes';

export const requestTemplates = {
  empty: 'No data request templates yet',
  title: 'Data request templates',
  id: 'data-request-templates',
  my_data_request_templates: 'My Data Request Templates',
  network_data_request_templates: 'Network Data Request Templates',
  subtitle:
    'These are the request templates you have created and all on the network',
  org_subtitle:
    'These are the request templates you have created and all on the network',
};

export const requestTemplate = {
  title: 'Data request template',
  data_request_template_id: 'Data request template ID',
  requests: 'Requests',
};

export const helperContent = {
  title: 'How to create your first Data Request Template.',
  desc: 'Data Request Templates serve as the blueprint for each Data Request, ensuring a standardized format for each inquiry across the web.',
  btnText: 'Learn how',
  btnLink: documentationRoutes.requestTemplate,
};

export const explorerRequestTemplates = {
  title: 'Data request templates',
  subtitle:
    'Data Request Templates serve as the foundational blueprint for each Data Request, ensuring a uniform structure and standardized format for each inquiry. To initiate a Data Request, one must select an appropriate Data Request Template.',
  help: 'How to use request templates',
  empty: 'No data request templates yet',
  featureTitle: 'Feature',
  listTitle: 'All data request templates',
  filters: {
    tags: 'Tags',
    comsumption_price: 'Average costs',
    amount_of_issuances: 'Amount of data requests',
    sort_by: 'Sort by',
  },
};

export const explorerRequestTemplateDetail = {
  tabs: {
    overview: 'Overview',
    verifiers: 'Verifiers',
    playground: 'Playground',
  },
};

export const explorerRequestTemplateDetailOverview = {
  unique_verifiers: 'Unique Verifiers',
  data_requests: 'Data requests',
  revenue_generated: 'Revenue Generated',
  labels: {
    signed_by: 'Signed by',
    creation_date: 'Creation date',
    last_update: 'Last update',
    average_request_cost: 'Average request cost',
    data_request_template_id: 'Data request template ID',
  },
  actions: {
    copy: 'Copy',
  },
};
