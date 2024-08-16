export type MigrationTarget = { username: string; image?: string };
export type MigrationStatus = 'pending' | 'finished' | 'error';
export type MigrationEvent = {
  status: MigrationStatus;
  target: MigrationTarget;
  error?: string;
};
