const dashboardUser = '/dashboard/user';
const dashboardOrg = '/dashboard/org';
const explorer = '/explorer';
const routes = {
  home: '/',
  auth: '/login',
  learn: '/learn',
  build: '/build',
  dashboard: {
    org: {
      asset: (org, pdaId) => `${dashboardOrg}/${org}/asset/${pdaId}`,
      proof: (org, proofId) => `${dashboardOrg}/${org}/proof/${proofId}`,
      request: (org, requestId) =>
        `${dashboardOrg}/${org}/request/${requestId}`,
      home: (organizationId) => `${dashboardOrg}/${organizationId}/home`,
      issuedAssets: (organizationId) =>
        `${dashboardOrg}/${organizationId}/assets/issued`,
      requests: (organizationId) =>
        `${dashboardOrg}/${organizationId}/requests`,
      myRequestTemplates: (organizationId) =>
        `${dashboardOrg}/${organizationId}/request-templates/my`,
      networkRequestTemplates: (organizationId) =>
        `${dashboardOrg}/${organizationId}/request-templates/network`,
      myDataModels: (organizationId) =>
        `${dashboardOrg}/${organizationId}/data-models/my`,
      networkDataModels: (organizationId) =>
        `${dashboardOrg}/${organizationId}/data-models/network`,
      receivedProofs: (organizationId) =>
        `${dashboardOrg}/${organizationId}/proofs/received`,
      settings: (organizationId) =>
        `${dashboardOrg}/${organizationId}/settings`,
      developerAccess: (organizationId) =>
        `${dashboardOrg}/${organizationId}/developer-access`,
      playground: (organizationId) =>
        `${dashboardOrg}/${organizationId}/playground`,
      wallet: (organizationId) => `${dashboardOrg}/${organizationId}/wallet`,
      root: dashboardOrg,
    },
    user: {
      home: `${dashboardUser}/home`,
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
      myDataModels: `${dashboardUser}/data-models/my`,
      networkDataModels: `${dashboardUser}/data-models/network`,
      settings: `${dashboardUser}/settings`,
      developerAccess: `${dashboardUser}/developer-access`,
      playground: `${dashboardUser}/playground`,
      wallet: `${dashboardUser}/wallet`,
    },
    createOrg: '/create-org',
  },
  explorer: {
    root: explorer,
    transactions: `${explorer}/transactions`,
    dataModels: `${explorer}/data-models`,
    dataRequestTemplates: '${explorer}/request-templates',
    dataModel: (dataModelId) => `${explorer}/data-model/${dataModelId}`,
    dataModelIssuers: (dataModelId) =>
      `${explorer}/data-model/${dataModelId}/issuers`,
    dataModelRequestTemplates: (dataModelId) =>
      `${explorer}/data-model/${dataModelId}/request-templates`,
    requestTemplate: (requestTemplateId) =>
      `${explorer}/request-template/${requestTemplateId}`,
    requestTemplateVerifiers: (requestTemplateId) =>
      `${explorer}/request-template/${requestTemplateId}/verifiers`,
    requestTemplatePlayground: (requestTemplateId) =>
      `${explorer}/request-template/${requestTemplateId}/playground`,
  },
};

module.exports = routes;
