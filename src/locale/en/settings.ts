export const settings = {
  title: 'Gateway ID',
  subtitle: 'Edit your ID and manage connected accounts',
  connected_accounts: {
    title: 'Connected accounts',
    description:
      'These are the accounts you connected to your Gateway ID to log in and receive private data assets. You can disconnect or connect more accounts here.',
    wallet: 'Wallet',
    modal_confirm_delete: {
      text_key: 'deactivate my gateway id',
      text_confirm1: 'To confirm this, type',
      text_confirm2: 'into the field and mark the checkbox',
      title: 'Are you sure you want to deactivate your Gateway ID?',
      subtitle:
        'Once you disconnect this account, you will lose the only way to access this Gateway ID. Please be certain.',
      subtitle2: 'Disconnecting the account, be aware:',
      text1: `You won't be able undo this action`,
      text2: 'The Gateway ID will be deactivated',
      text3: 'will be available to anyone to use as ID',
      checkbox: `I acknowledge that upon Gateway ID deactivation, I won't be able undo these actions`,
      error_message: 'Something seems to be wrong, please try again',
    },
  },
  notifications: {
    receiving_account: 'Receiving notifications',
    receive_here: 'Receive notifications here',
  },
  actions: {
    add_email_address: 'Add email address',
    add_wallet: 'Add wallet',
    disconnect: 'Disconnect',
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
