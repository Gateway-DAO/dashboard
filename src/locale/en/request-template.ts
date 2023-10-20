import documentationRoutes from '@/constants/documentationRoutes';

export const requestTemplates = {
  empty: 'No data request templates yet',
  title: 'Data request templates',
  id: 'data-request-templates',
  subtitle: 'These are the request templates you have created',
  org_subtitle: 'These are the request templates you have created',
};

export const requestTemplate = {
  title: 'Data request template',
  data_request_template_id: 'Data request template ID',
};

export const helperContent = {
  title: 'How to create your first Data Request Template.',
  desc: 'Data Request Templates serve as the blueprint for each Data Request, ensuring a standardized format for each inquiry across the web.',
  btnText: 'Learn how',
  btnLink: documentationRoutes.requestTemplate,
};
