const routes = {
  home: '/',
  auth: '/login',
  dashboardUserHome: '/dashboard/user',
  dashboardUserAsset: (pdaId) => `/dashboard/user/asset/${pdaId}`,
  dashboardUserIssuedAssets: '/dashboard/user/assets/issued',
  dashboardUserReceivedAssets: '/dashboard/user/assets/received',
  dashboardUserProofs: `/dashboard/user/proofs`,
  dashboardUserProof: (proofId) => `/dashboard/user/proof/${proofId}`,
  dashboardUserSentProofs: '/dashboard/user/proofs/sent',
  dashboardUserReceivedProofs: '/dashboard/user/proofs/received',
  dashboardUserRequest: (requestId) => `/dashboard/user/request/${requestId}`,
  dashboardUserRequests: '/dashboard/user/requests',
  dashboardOrgRoot: '/dashboard/org',
  dashboardOrgHome: (organizationId) => `/dashboard/org/${organizationId}`,
  dashboardOrgIssuedAssets: (organizationId) =>
    `/dashboard/org/${organizationId}/assets/issued`,
  dashboardOrgRequests: (organizationId) =>
    `/dashboard/org/${organizationId}/requests`,
  dashboardOrgReceivedProofs: (organizationId) =>
    `/dashboard/org/${organizationId}/proofs/received`,
};

module.exports = routes;
