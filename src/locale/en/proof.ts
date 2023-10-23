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
    data_proof_id: 'Data Proof ID',
    data_asset_shared: 'Data asset shared',
  },
};

export const proofs = {
  empty: 'No data proofs yet',
  data_proofs: 'Data proofs',
  data_proofs_subtitle:
    'These are the copies of data proofs that you have sent and that have been sent to you',
  owner: 'Owners',
  verifier: 'Verifier',
  sender: 'Senders',
  request_id: 'Request ID',
  request_template_id: 'Request template ID',
  share_date: 'Share date',
  data_amount: 'Data amount',
  received_proofs: 'Data Proofs Received',
  received_proofs_subtitle:
    'These are the copies of data assets that have been sent to you',
};

export const helperContent = {
  title: 'Share your data with Data Proofs',
  desc: 'Data Proofs facilitate data exchange in a secure, user-consented, and privacy preserving manner. Proofs can be shared to Verifiers or anyone you want to have access to your information.',
  btnText: 'Learn how',
  btnLink: documentationRoutes.proof,
};
