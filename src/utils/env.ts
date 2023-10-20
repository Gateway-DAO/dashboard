export const currentEnv = ():
  | 'development'
  | 'staging'
  | 'testnet'
  | string => {
  return process.env.NEXT_PUBLIC_API_ENV || 'development';
};
