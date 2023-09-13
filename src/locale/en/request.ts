export const requests = {
  empty: 'No data requests yet',
  title: 'Data requests',
  subtitle: 'These are the requests to access your private data assets',
};

export const request = {
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
      rejected: {
        title: "You don't met the criteria",
        description: (requester: string) =>
          `${requester} is requested your private data assets, but you don’t meet the criterias requested.`,
      },
      accepted: {
        title: 'Request accepted',
        description: (requester: string) =>
          `You authorized ${requester} to access your private data assets.`,
      },
    },
  },
};
