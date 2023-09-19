export const settings = {
  title: 'Gateway ID',
  subtitle: 'Edit your ID and manage connected accounts',
  connected_accounts: {
    title: 'Connected accounts',
    description:
      'These are the accounts you connected to your Gateway ID to log in and receive private data assets. You can disconnect or connect more accounts here.',
  },
  notifications: {
    receiving_account: 'Receiving notifications',
    receive_here: 'Receive notifications here',
  },
  actions: {
    add_email_address: 'Add email address',
    add_wallet: 'Add wallet',
  },
  developer_portal: {
    title: 'Developer portal',
    description: "Here's all the info needed to connect to our API.",
    api_key: 'API key',
    auth_token: 'Authentication token',
    auth_token_warning:
      'By sharing your authentication token, you assume all responsibility for any actions performed using your token, whether authorized or unauthorized.',
    usage_limit: {
      title: 'Usage limit',
      issued_credentials: 'Issued credentials',
      data_model_created: 'Data model created',
      rate: (minimum: number, maxium: number) => `${minimum} out of ${maxium}`,
    },
  },
};
