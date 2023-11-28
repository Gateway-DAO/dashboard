export const transaction = {
  title: 'Transactions',
  total_amount: 'Total amount',
  amount: 'Amount',
  detail: 'Detail',
  transaction_id: 'Transaction ID',
  date: 'Date',
  type: 'Type',
  earning: 'Earning',
  cards: {
    pdas: 'PDAs issued',
    issuers: 'Unique issuers',
    data_requests: 'Data requests created',
    fees: 'Fees generated for issuers',
  },
  last_transactions: 'Last transactions',
  home_table: {
    columns: {
      id: 'Txn ID',
      action: 'Action',
      date: 'Date',
    },
    view_more: 'View all transactions',
  },
};

export const transaction_detail = {
  transaction_id: 'Transaction ID',
  action: 'Action',
  pda_id: 'Private Data Asset ID',
  issuer: 'Issuer',
  signed_by: 'Signed by',
  data_model_id: 'Data model ID',
  created_at: 'Created at',
  cost: 'Cost',
  status: 'Status',
  transaction_data: 'Transaction data',
  gateway_id: 'Gateway ID',
  request_id: 'Request ID',
  owner: 'Owner',
  verifier: 'Verifier',
  verified: 'Verification',
  request_template: 'Request Template ID',
};

export const financial_transaction_actions = {
  in: {
    deposit: 'Money deposit',
    pda_revenue: 'PDA consumption revenue',
  },
  out: {
    request_cost: 'Request cost',
    withdraw: 'Money withdraw',
    proof_share: 'Data proof sharing',
    pda_issuance: 'PDA issuance cost',
    pda_update: 'PDA update cost',
    pda_status_change: 'PDA status change cost',
    data_model: 'Data model created',
    data_request_template: 'Data Request Template created',
  },
};

export const transaction_actions = {
  user_create: 'User creation',
  pda_issuance: 'PDA issuance',
  pda_update: 'PDA update',
  pda_status_change: 'PDA status change',
  data_model: 'Data Model creation',
  org_create: 'Organization creation',
  org_update: 'Organization update',
  proof_create: 'Proof creation',
  proof_status_change: 'Proof status change',
  request_create: 'Request creation',
  request_status_change: 'Request status change',
  request_template: 'Request Template creation',
  money_deposit: 'Money deposit',
  issuers_earnings: 'PDA consumption revenue',
};
