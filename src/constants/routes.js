const routes = {
  home: '/',
  auth: '/login',
  dashboardUserHome: '/dashboard/user',
  dashboardUserProof: '/dashboard/user/proof/[id]',
  dashboardUserProofs: '/dashboard/user/proofs',
  dashboardUserReceivedAssets: '/dashboard/user/assets/received',
  dashboardUserSentAssets: '/dashboard/user/assets/sent',
  dashboardUserAsset: '/dashboard/user/asset/[id]',
  dashboardUserRequests: '/dashboard/user/requests',
  dashboardUserRequest: '/dashboard/user/request/[id]',
  dashboardOrgRoot: '/dashboard/org',
  dashboardOrg: '/dashboard/org/[id]',
};

module.exports = routes;
