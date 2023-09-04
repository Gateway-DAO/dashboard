const routes = {
  home: '/',
  auth: '/login',
  dashboardUserHome: '/dashboard/user',
  dashboardUserAsset: (pdaId) => `/dashboard/user/asset/${pdaId}`,
  dashboardUserIssuedAssets: '/dashboard/user/assets/issued',
  dashboardUserReceivedAssets: '/dashboard/user/assets/received',
  dashboardUserProof: (proofId) =>  `/dashboard/user/proof/${proofId}`,
  dashboardUserProofs: '/dashboard/user/proofs',
  dashboardUserRequest: (requestId) =>  `/dashboard/user/request/${requestId}`,
  dashboardUserRequests: '/dashboard/user/requests',
  dashboardOrgRoot: '/dashboard/org',
  dashboardOrgHome: (organizationId) => `/dashboard/org/${organizationId}`,
  dashboardOrgIssuedAssets: (organizationId) => `/dashboard/org/${organizationId}/assets/issued`,
  dashboardOrgRequests: (organizationId) => `/dashboard/org/${organizationId}/requests`,
  dashboardOrgReceivedProofs: (organizationId) => `/dashboard/org/${organizationId}/proofs/received`,
};

module.exports = routes;
