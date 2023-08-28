import { NextRequest } from "next/server";

import DashboardUserMiddleware from "@/middlewares/dashboard-org-middleware";
import DashboardOrgMiddleware from "@/middlewares/dashboard-user-middleware";

export default async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/dashboard/user')) {
    DashboardUserMiddleware(request);
  }

  if (request.nextUrl.pathname.startsWith('/dashboard/org')) {
    DashboardOrgMiddleware(request);
  }

  console.log(request.cookies.getAll())

}
