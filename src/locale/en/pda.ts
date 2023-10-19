import documentationRoutes from '@/constants/documentationRoutes';

export const pda = {
  status: {
    title: 'Status',
    valid: 'Valid',
    expired: 'Expired',
    revoked: 'Revoked',
  },
  share: {
    share_a_copy_with: 'Share a copy with',
    share_a_copy_description: 'Fill a Gateway ID, email or wallet',
    sharing_cost: 'Sharing cost',
    sharing_cost_helper: 'For now Gateway is covering sharing costs',
    free: 'Free',
    successfully_title: 'Copy shared successfully',
  },
  shared_with: {
    shared_with: 'Shared with',
    verifier: 'Verifier',
    data_proof_id: 'Data proof ID',
  },
  activities: {
    issued: 'PDA issued',
    revoked: 'PDA revoked',
    suspended: 'PDA suspended',
    reactivated: 'PDA reactivated',
    updated: 'PDA updated',
  },
  revoke: {
    dialog_title: 'Are you sure to revoke this PDA?',
    dialog_text:
      'If you revoke this PDA, it will not be possible to undo this action.',
  },
  change_status: {
    dialog_title_valid: 'Are you sure to make valid this PDA?',
    dialog_title_suspend: 'Are you sure to suspend this PDA?',
    dialog_text:
      'After changing the status of this PDA, you can change to the previous state.',
  },
  claim: 'Claim',
  issuer: 'Issuer',
  owner: 'Owner',
  unfilled: 'Unfilled',
  received_at: 'Received at',
  authenticated_by: 'Signed by',
  issuance_date: 'Issuance date',
  expiration_date: 'Expiration date',
  indeterminate: 'Indeterminate',
};
export const pdas = {
  empty: 'No data assets yet',
  load_more: 'load more',
  my_data_assets: 'Data assets',
  data_assets_subtitle:
    'These are the private data assets you have collected and sent',
};
export const orgPdas = {
  empty: 'No issued Data Assets yet',
  data_assets_title: 'Issued data assets',
  data_assets_subtitle: 'These are the private data assets you have issued',
};

export const helperContent = {
  title: 'What is a Private Data Asset',
  desc: 'Data Assets allow users to become Data Owners. A secure, encrypted, and portable asset which users can consent to other applications, people, or institutions to verify their data.',
  btnText: 'Learn more',
  btnLink: documentationRoutes.pda,
};

export const helpMenu = {
  docsTitle: 'Help & documentation',
  docsLink: 'https://docs.mygateway.xyz/docs',
  discordTitle: 'Support channel',
  discordLink: 'https://discord.com/invite/bxTaYsJ6WD',
};
