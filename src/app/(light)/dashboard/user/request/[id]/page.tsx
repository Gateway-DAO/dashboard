import Link from "next/link";

import routes from "@/constants/routes";
import { PageProps } from "@/types/next";

export default function DashboardUserDataRequest({ params: { id } }: PageProps<{ id: string }>) {
  return (
    <>
      <h1>DashboardUserDataRequest</h1>
      <p>Open <Link href={{
        query: {
          back: routes.dashboardUserRequest(id)
        },
        pathname: routes.dashboardUserProof("mock")
      }}>proof</Link></p>
    </>
  )
}
