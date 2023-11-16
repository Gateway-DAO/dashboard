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
};

export const transaction_actions = {
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
    data_request: 'Data Request Template created',
  },
};
