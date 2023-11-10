declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_ENDPOINT: string;
      NEXT_PUBLIC_API_KEY: string;
      NEXT_PUBLIC_API_ENV: string;
      NEXTAUTH_SECRET: string;
      SECURE_API_KEY: string;
    }
  }

  interface Window {
    pocketNetwork: any;
  }
}
export {};
