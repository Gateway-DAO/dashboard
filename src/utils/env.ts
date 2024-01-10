export const currentEnv = ():
  | 'development'
  | 'staging'
  | 'testnet'
  | 'production'
  | string => {
  return process.env.NEXT_PUBLIC_API_ENV || 'development';
};
