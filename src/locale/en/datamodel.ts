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

export const explorerDataModels = {
  title: 'Data Models',
  subtitle:
    'Data models serve as foundational templates for Private Data Assets (PDAs). Each PDA created using a data model adheres to a standardized structure of claims, making these frameworks exceptionally reusable for various related scenarios.',
  help: 'How to use data models',
  empty: 'No data models yet',
  featureTitle: 'Feature',
  listTitle: 'All data models',
};

export const explorerDataModelDetail = {
  tabs: {
    issuers: 'Issuers',
    tied_request_templates: 'Tied Request Templates',
  },
};

export const explorerDataModelDetailOverview = {
  unique_issuers: 'Unique Issuers',
  pdas_issued: 'PDAs Issued',
  tied_request_templates: 'Tied Request Templates',
  revenue_generated: 'Revenue Generated',
  labels: {
    signed_by: 'Signed by',
    creation_date: 'Creation date',
    last_update: 'Last update',
    pda_comsumption_cost: 'PDA consumption cost',
    data_model_id: 'Data model ID',
  },
  actions: {
    copy_claim_structure: 'Copy claim structure',
  },
};

export const explorerDataModelCard = {
  consumption: 'per consumption',
  issuances: (count: number) => `issuance${count > 0 ? 's' : ''}`,
};
