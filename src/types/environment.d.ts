declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_ENDPOINT: string;
      NEXT_PUBLIC_API_KEY: string;
      NEXT_PUBLIC_API_ENV:
        | 'development'
        | 'staging'
        | 'testnet'
        | 'production'
        | string;
      NEXTAUTH_SECRET: string;
      SECURE_API_KEY: string;
    }
  }
}
export {};
