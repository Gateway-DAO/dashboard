const dashboardUser = '/dashboard/user';
const dashboardOrg = '/dashboard/org';
const explorer = '/explorer';
const routes = {
  home: '/',
  login: '/login',
  signUp: '/sign-up',
  learn: '/learn',
  build: '/build',
  dashboard: {
    org: {
      asset: (org, pdaId) => `${dashboardOrg}/${org}/asset/${pdaId}`,
      issue: (org) => `${dashboardOrg}/${org}/assets/issue`,
      issuePda: (org, id) => `${dashboardOrg}/${org}/assets/issue/${id}`,
      proof: (org, proofId) => `${dashboardOrg}/${org}/proof/${proofId}`,
      request: (org, requestId) =>
        `${dashboardOrg}/${org}/request/${requestId}`,
      home: (organization) => `${dashboardOrg}/${organization}/home`,
      issuedAssets: (organization) =>
        `${dashboardOrg}/${organization}/assets/issued`,
      requests: (organization) => `${dashboardOrg}/${organization}/requests`,
      myRequestTemplates: (organization) =>
        `${dashboardOrg}/${organization}/request-templates/my`,
      networkRequestTemplates: (organization) =>
        `${dashboardOrg}/${organization}/request-templates/network`,
      myDataModels: (organization) =>
        `${dashboardOrg}/${organization}/data-models/my`,
      networkDataModels: (organization) =>
        `${dashboardOrg}/${organization}/data-models/network`,
      receivedProofs: (organization) =>
        `${dashboardOrg}/${organization}/proofs/received`,
      settings: (organization) => `${dashboardOrg}/${organization}/settings`,
      developerAccess: (organization) =>
        `${dashboardOrg}/${organization}/developer-access`,
      playground: (organization) =>
        `${dashboardOrg}/${organization}/playground`,
      wallet: (organization) => `${dashboardOrg}/${organization}/wallet`,
      root: dashboardOrg,
    },
    user: {
      home: `${dashboardUser}/`,
      issue: `${dashboardUser}/assets/issue`,
      issuePda: (id) => `${dashboardUser}/assets/issue/${id}`,
      asset: (pdaId) => `${dashboardUser}/asset/${pdaId}`,
      myAssets: `${dashboardUser}/assets`,
      shared: `${dashboardUser}/shared`,
      sharedData: (proofId) => `${dashboardUser}/shared/${proofId}`,
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
  appStore: '/api/wallet-download',
};

module.exports = routes;
