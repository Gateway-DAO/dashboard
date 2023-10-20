import documentationRoutes from '@/constants/documentationRoutes';

export const datamodel = {
  title: 'Data model',
  data_model_id: 'Data model ID',
  consumption_cost: 'Consumption cost',
  issuances: 'Issuances',
};

export const datamodels = {
  empty: 'No data models yet',
  title: 'Data models',
  id: 'data-models',
  my_data_models: 'My Data Models',
  network_data_models: 'Network Data Models',
  subtitle: 'These are the data model you have created and all on the network',
  org_subtitle:
    'These are the data model you have created and all on the network',
};

export const helperContent = {
  title: 'How to Create Data Models',
  desc: 'Data Models serve as foundational structures for Data Assets. Data Models streamline the process for developers and applications to issue or verify claims.',
  btnText: 'Learn how',
  btnLink: documentationRoutes.dataModel,
};
