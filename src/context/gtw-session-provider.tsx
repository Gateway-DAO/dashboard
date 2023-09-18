"use client"
import { Session } from "next-auth";
import { PropsWithChildren, createContext, useContext } from "react";

import { Api, api, apiPublic } from "@/services/protocol/api";

type GtwSessionType = {
  session: Session
  privateApi: Api
}

export const GtwSessionContext = createContext<GtwSessionType>({
  session: {} as Session,
  privateApi: apiPublic
})

export function GtwSessionProvider({ children, session }: PropsWithChildren<{ session: Session }>) {
  return (
    <GtwSessionContext.Provider value={{ session, privateApi: api(session?.token ?? "") }}>
      {children}
    </GtwSessionContext.Provider>
  )
}

export const useGtwSession = () => useContext(GtwSessionContext);
