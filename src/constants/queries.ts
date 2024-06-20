//Mutations and queries

export const queries = {
  proofs_by_pdas_id: 'proofs_by_pdas_id',
  proof: 'proof',
  proofs_received: 'proofs_received',
  proofs_received_by_org: 'proofs_received_by_org',
  proofs_sent: 'proofs_sent',
  usage_limit: 'user_monthly_usage_limits',
  data_request_template: 'data_request_template',
  data_model: 'data_model',
  my_wallet: 'my_wallet',
  my_transactions: 'my_transactions',
  my_transactions_count: 'my_transactions_count',
  featured_data_models: 'featured_data_models',
  user_info: 'user_info',
  pdas: 'pdas',
  get_widget_key: 'get_widget_key',
};

export const mutations = {
  create_proof: 'create_proof',
  change_pda_status: 'change_pda_status',
  create_proof_from_request: 'create_proof_from_request',
  reject_data_request: 'reject_data_request',
  disconnect_email: 'disconnect_email',
  disconnect_wallet: 'disconnect_wallet',
  update_notification_email: 'update_notification_email',
  create_org_key: 'create_org_key',
  generate_issue_session_educational: 'generate_issue_session_educational',
  get_issued_session_educational: 'get_issued_session_educational',
};

export const explorerQueries = {
  transaction: 'transaction',
  transaction_arweave: 'transaction_arweave',
  home_stats: 'explorer_home_stats',
  transactions_stats: 'explorer_transactions_stats',
  transactions: 'transactions',
  last_transactions: 'last_transactions',
  featured_data_models: 'data-models-featured',
  featured_data_requests_templates: 'request-templates-featured',
  request_templates_metadata: 'request_templates_metadata',
  request_templates: 'request_templates',
};
