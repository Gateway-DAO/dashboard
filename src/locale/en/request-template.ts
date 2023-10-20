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
