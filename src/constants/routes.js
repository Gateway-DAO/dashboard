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
    asset: (pdaId) => `${dashboard}/asset/${pdaId}`,
    myDataModels: `${dashboard}/data-models`,
    networkDataModels: `${dashboard}/data-models/network`,
    settings: `${dashboard}/settings`,
    developerAccess: `${dashboard}/api`,
  },
  explorer: {
    root: explorer,
    transactions: `${explorer}/transactions`,
    transaction: (transactionId) => `${explorer}/transactions/${transactionId}`,
    dataModels: `${explorer}/data-models`,
    dataModel: (dataModelId) => `${explorer}/data-models/${dataModelId}`,
    requestTemplates: `${explorer}/request-templates`,
  },
};

module.exports = routes;
