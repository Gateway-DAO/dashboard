import documentationRoutes from '@/constants/documentationRoutes';

export const pda = {
  status: {
    title: 'Status',
    valid: 'Valid',
    expired: 'Expired',
    revoked: 'Revoked',
  },
  share: {
    share_a_copy_with: 'Share this data',
    share_a_copy_description: 'Fill a Gateway ID, email or wallet',
    share_now: 'Share now',
    shared_with: 'Shared with',
    data: 'Data',
    sharing_cost: 'Proof sharing cost',
    free: 'Free',
    successfully_title: 'Data shared successfully',
    error_title: 'Error sharing data',
    user_doesnt_exist: 'User does not exist',
  },
  shared_with: {
    shared_with: 'Shared with',
    verifier: 'Verifier',
    data_proof_id: 'Shared Data ID',
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
  data_contributor: 'Data Contributor',
  owner: 'Owner',
  unfilled: 'Unfilled',
  received_at: 'Received at',
  authenticated_by: 'Signed by',
  issuance_date: 'Issuance date',
  expiration_date: 'Expiration date',
  indeterminate: 'Indeterminate',
  issuance_summary: 'Issuance Summary',
  total: 'Total',
};
export const pdas = {
  empty: 'No data assets yet',
  load_more: 'load more',
  my_data_assets: 'My data vault',
  data_asset: 'Data asset',
  recipient: 'Recipient',
  status: 'Status',
  data_model_id: 'Data model ID',
  issuance_date: 'Issuance date',
  data_assets_subtitle:
    'These are the personal data assets you have earned and created.',
  issue_a_pda: 'Issue a PDA',
  upload_file: 'Upload file',
};
export const orgPdas = {
  empty: 'No Issuances yet',
  data_assets_title: 'Issuances',
  data_assets_subtitle: 'These are the personal data assets you have issued',
};

export const helperContent = {
  title: 'What is a Personal Data Asset',
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

export const issuePda = {
  title: 'Issue a Personal Data Asset',
  subtitle: 'Select a Data Model',
  featured: 'Featured',
  success_title: 'Personal Data Asset issued successfully',
};

export const csvUpload = {
  title: 'Issue to multiple owners',
  subtitle: 'Follow the instructions',
  steps: {
    download: {
      title: 'Download CSV template',
      description: 'This is the file template you should fill and upload.',
      text_btn: 'Download',
      link: 'https://docs.google.com/spreadsheets/d/1uNh_-tRNteXhfjGyeNULrpT8eZRBZOrrZVdWnmmBASQ/edit#gid=0',
    },
    fill_csv: {
      title: 'Fill the CSV template',
      description:
        'Follow the instructions inside the file for a successful issuance.',
    },
    upload: {
      title: 'Upload CSV template',
      description:
        'Upload and await an email from the Gateway team confirming completion.',
      text_btn: 'Upload',
      link: 'https://mygateway.typeform.com/to/eYjp0a8S',
    },
  },
};

export const issuePdaForm = {
  title: 'Issue a Personal Data Asset',
  subtitle: 'Complete your PDA details',
  details: {
    title: 'Title',
    description: 'Description',
  },
  issue_to: {
    title: 'Issue to',
    description: 'Add who will be the owner of this PDA',
  },
  claim: {
    description:
      'The claim define what the PDA represents about a user or how it relates to the user',
  },
  summary: {
    title: 'Issuance Summary',
    total: (price: string, amount: number) => `${price} (Qty: ${amount})`,
  },
  helpers: {
    date: 'Date in UTC timezone',
    datetime: 'Date Time in UTC timezone',
    time: 'Time in UTC timezone',
  },
};

export const pdaTableColumnNames = {
  name: 'Name',
  uploadedBy: 'Uploaded By',
  sharing: 'Sharing',
  lastModified: 'Last Modified',
};
