//Mutations and queries

export const queries = {
  proofs_by_pdas_id: 'proofs_by_pdas_id',
  proof: 'proof',
  proofs_received: 'proofs_received',
  proofs_received_by_org: 'proofs_received_by_org',
  proofs_sent: 'proofs_sent',
  usage_limit: 'user_monthly_usage_limits',
};

export const mutations = {
  create_proof: 'create_proof',
  change_pda_status: 'change_pda_status',
  create_proof_from_request: 'create_proof_from_request',
  reject_data_request: 'reject_data_request',
  disconnect_email: 'disconnect_email',
  disconnect_wallet: 'disconnect_wallet',
  update_notification_email: 'update_notification_email',
};
