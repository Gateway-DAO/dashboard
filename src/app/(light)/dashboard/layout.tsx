import { PropsWithChildren } from "react";

import { getServerSession } from "@/services/next-auth/get-server-session";

import { SessionProvider } from "../../../context/session-provider";

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const session = await getServerSession();

  return <SessionProvider session={session}>{children}</SessionProvider>
}
