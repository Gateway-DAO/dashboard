import { PropsWithChildren } from "react";

import DashboardLayout from "../components/dashboard-layout";

export default function DashboardOrganizationLayout({ children }: PropsWithChildren) {
  return <DashboardLayout content={<><div>Organization</div></>}>
    {children}
  </DashboardLayout>
}
