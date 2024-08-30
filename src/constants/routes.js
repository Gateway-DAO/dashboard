const dashboard = '/dashboard';
const explorer = '/explorer';
const routes = {
  home: '/',
  new: '/new',
  blog: '/blog',
  ecosystem: '/ecosystem',
  termsOfService: '/terms-of-service',
  privacyPolicy: '/privacy-policy',
  dashboard: {
    home: `${dashboard}/storage`,
    issue: `${dashboard}/assets/issue`,
    issuePda: (id) => `${dashboard}/assets/issue/${id}`,
    asset: (pdaId) => `${dashboard}/asset/${pdaId}`,
    issuedAssets: `${dashboard}/assets/issued`,
    receivedAssets: `${dashboard}/assets/received`,
    proofs: `${dashboard}/proofs`,
    proof: (proofId) => `${dashboard}/proof/${proofId}`,
    sentProofs: `${dashboard}/proofs/sent`,
    receivedProofs: `${dashboard}/proofs/received`,
    request: (requestId) => `${dashboard}/request/${requestId}`,
    requests: `${dashboard}/requests`,
    myRequestTemplates: `${dashboard}/request-templates/my`,
    networkRequestTemplates: `${dashboard}/request-templates/network`,
    myDataModels: `${dashboard}/data-models`,
    networkDataModels: `${dashboard}/data-models/network`,
    settings: `${dashboard}/settings`,
    developerAccess: `${dashboard}/api`,
    playground: `${dashboard}/playground`,
    wallet: `${dashboard}/wallet`,
  },
  explorer: {
    root: explorer,
    transactions: `${explorer}/transactions`,
    transaction: (transactionId) => `${explorer}/transactions/${transactionId}`,
    dataModels: `${explorer}/data-models`,
    signMessage: `${explorer}/sign-message`,
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
