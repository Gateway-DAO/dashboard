const dashboardUser = '/dashboard';
const explorer = '/explorer';
const routes = {
  home: '/',
  auth: '/login',
  dashboard: {
    user: {
      home: `${dashboardUser}/storage`,
      issue: `${dashboardUser}/assets/issue`,
      issuePda: (id) => `${dashboardUser}/assets/issue/${id}`,
      asset: (pdaId) => `${dashboardUser}/asset/${pdaId}`,
      issuedAssets: `${dashboardUser}/assets/issued`,
      receivedAssets: `${dashboardUser}/assets/received`,
      proofs: `${dashboardUser}/proofs`,
      proof: (proofId) => `${dashboardUser}/proof/${proofId}`,
      sentProofs: `${dashboardUser}/proofs/sent`,
      receivedProofs: `${dashboardUser}/proofs/received`,
      request: (requestId) => `${dashboardUser}/request/${requestId}`,
      requests: `${dashboardUser}/requests`,
      myRequestTemplates: `${dashboardUser}/request-templates/my`,
      networkRequestTemplates: `${dashboardUser}/request-templates/network`,
      myDataModels: `${dashboardUser}/data-models/`,
      networkDataModels: `${dashboardUser}/data-models/network`,
      settings: `${dashboardUser}/settings`,
      developerAccess: `${dashboardUser}/api`,
      playground: `${dashboardUser}/playground`,
      wallet: `${dashboardUser}/wallet`,
    },
    createOrg: '/create-org',
  },
  explorer: {
    root: explorer,
    transactions: `${explorer}/transactions`,
    transaction: (transactionId) => `${explorer}/transactions/${transactionId}`,
    dataModels: `${explorer}/data-models`,
    dataModel: (dataModelId) => `${explorer}/data-models/${dataModelId}`,
    dataModelIssuers: (dataModelId) =>
      `${explorer}/data-models/${dataModelId}/issuers`,
    dataModelRequestTemplates: (dataModelId) =>
      `${explorer}/data-models/${dataModelId}/request-templates`,
    requestTemplates: `${explorer}/request-templates`,
    requestTemplate: (requestTemplateId) =>
      `${explorer}/request-templates/${requestTemplateId}`,
    requestTemplateVerifiers: (requestTemplateId) =>
      `${explorer}/request-templates/${requestTemplateId}/verifiers`,
    requestTemplatePlayground: (requestTemplateId) =>
      `${explorer}/request-templates/${requestTemplateId}/playground`,
  },
};

module.exports = routes;
