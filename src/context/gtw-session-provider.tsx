'use client';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, createContext, useContext, useEffect } from 'react';

import routes from '@/constants/routes';
import { Api, api, apiPublic } from '@/services/protocol/api';

type GtwSessionType = {
  session: Session;
  privateApi: Api;
};

export const GtwSessionContext = createContext<GtwSessionType>({
  session: {} as Session,
  privateApi: apiPublic,
});

export function GtwSessionProvider({
  children,
  session,
}: PropsWithChildren<{ session: Session }>) {
  const { status } = useSession();
  const { replace } = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      const { pathname } = window.location;
      const pathnameUri = encodeURIComponent(pathname);
      replace(routes.login + `?callbackUrl=${pathnameUri}`);
    }
  }, [status]);

  return (
    <GtwSessionContext.Provider
      value={{ session, privateApi: api(session?.token ?? '') }}
    >
      {children}
    </GtwSessionContext.Provider>
  );
}

export const useGtwSession = () => useContext(GtwSessionContext);
