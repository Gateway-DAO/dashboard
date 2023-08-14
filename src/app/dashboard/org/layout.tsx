import { PropsWithChildren } from "react";

import DashboardLayout from "../components/dashboard-layout";

export default function DashboardUserLayout({ children }: PropsWithChildren) {
  return <DashboardLayout content={<><div>User</div></>}>
    {children}
  </DashboardLayout>
}
