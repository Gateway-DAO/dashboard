const routes = {
  home: '/',
  auth: '/login',
  dashboardUserHome: '/dashboard/user',
  dashboardUserAsset: '/dashboard/user/asset/[id]',
  dashboardUserIssuedAssets: '/dashboard/user/assets/issued',
  dashboardUserReceivedAssets: '/dashboard/user/assets/received',
  dashboardUserProof: '/dashboard/user/proof/[id]',
  dashboardUserProofs: '/dashboard/user/proofs',
  dashboardUserRequest: '/dashboard/user/request/[id]',
  dashboardUserRequests: '/dashboard/user/requests',
  dashboardOrgRoot: '/dashboard/org',
  dashboardOrgHome: '/dashboard/org/[id]',
  dashboardOrgIssuedAssets: '/dashboard/org/[id]/assets/issued',
  dashboardOrgRequests: '/dashboard/org/[id]/requests',
  dashboardOrgReceivedProofs: '/dashboard/org/[id]/proofs/received',
};

module.exports = routes;
