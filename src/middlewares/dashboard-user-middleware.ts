
import { NextRequest } from "next/server";

export default function DashboardOrgMiddleware(request: NextRequest) {
  request.cookies.set("dashboard", "user");
}
