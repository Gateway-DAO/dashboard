import documentationRoutes from '@/constants/documentationRoutes';

export const proof = {
  status: {
    title: 'Status',
    up_to_date: 'Up-to-date',
    invalid: 'Invalid',
    revoked: 'Revoked',
  },
  share_date: 'Share date',
  request_id: 'Request ID',
  request_template_id: 'Request template ID',
  share: {
    data_shared_with: 'Shared with',
    data_shared_by: 'Shared by',
    data_proof_id: 'Shared data ID',
    data_asset_shared: 'Data asset shared',
  },
};

export const proofs = {
  empty: 'No shared datas yet',
  data_proofs: 'Shared Data',
  data_proofs_subtitle:
    'These are the copies of shared datas that you have sent and that have been sent to you',
  owner: 'Owners',
  verifier: 'Verifier',
  sender: 'Senders',
  request_id: 'Request ID',
  request_template_id: 'Request template ID',
  share_date: 'Share date',
  data_amount: 'Data amount',
  received_proofs: 'Received Shared Datas',
  received_proofs_subtitle:
    'These are the copies of data assets that have been sent to you',
};

export const helperContent = {
  title: 'Share your data',
  desc: 'Shared Datas facilitate data exchange in a secure, user-consented, and privacy preserving manner. Proofs can be shared to Verifiers or anyone you want to have access to your information.',
  btnText: 'Learn how',
  btnLink: documentationRoutes.proof,
};
