export const migration = {
  title: {
    finished: 'Data migrated successfully',
    pending: 'Data migration is in progress',
    error: 'Error on data migration',
  },
  body: {
    finished:
      "The data migration was completed successfully and your it's available in you Gateway Wallet app.",
    pending:
      'The migration will be completed soon. When the migration completes, your data will appear in your Gateway Wallet app.',
    error: 'There was an error on migration:',
  },
  labels: {
    old_protocol: 'Old protocol',
    new_protocol: 'New protocol',
  },
};

export const error_status: Record<string, string> = {
  USER_ALREADY_HAS_TARGET:
    "You already have a target user on the new protocol. You can't update it.",
  INTERNAL_SERVER_ERROR:
    'Error on starting migration. If error still persists, please contact Gateway',
};
