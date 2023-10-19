import documentationRoutes from '@/constants/documentationRoutes';

export const requests = {
  empty: 'No data requests yet',
  title: 'Data requests',
  id: 'data-requests',
  subtitle: 'These are the requests to access your private data assets',
  org_subtitle: 'These are the requests to access private data assets',
};

export const request = {
  title: 'Data request',
  label: {
    request_id: 'Request ID',
    request_template_id: 'Request template ID',
    requested_data: 'Requested data',
  },
  status: {
    accepted: 'Accepted',
    pending: 'Pending',
    expired: 'Expired',
    rejected: 'Rejected',
  },
  request_card: {
    title: 'Requested by',
    content: {
      pending: {
        title: "You're ready to proceed",
        description: (requester: string) =>
          `${requester} is requesting to access your private data assets`,
      },
      notAcceptable: {
        title: "You don't met the criteria",
        description: (requester: string) =>
          `${requester} is requested your private data assets, but you don’t meet the criterias requested.`,
      },
      rejected: {
        title: 'Request rejected',
        description: (requester: string) =>
          `You didn't authorize ${requester} to access your private data assets.`,
      },
      accepted: {
        title: 'Request accepted',
        description: (requester: string) =>
          `You authorized ${requester} to access your private data assets.`,
      },
    },
  },
  request_card_verifier: {
    title: 'Requested to',
    content: {
      rejected: {
        title: 'Request rejected',
        description: (recipient: string) =>
          `${recipient} didn't authorize you to access their private data assets.`,
      },
      accepted: {
        title: 'Request accepted',
        description: (recipient: string) =>
          `${recipient} authorized you to access their private data assets.`,
      },
    },
  },
};

export const helperContent = {
  title: 'Want to verify? Create your first Data Request',
  desc: 'Requests specify the information you want to consume. Explaining to the Data Owner what specific data asset they need to share.',
  btnText: 'Start now',
  btnLink: documentationRoutes.dataRequest,
};
