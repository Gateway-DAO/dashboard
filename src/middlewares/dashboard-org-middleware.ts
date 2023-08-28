import { NextRequest } from "next/server";

export default function DashboardUserMiddleware(request: NextRequest) {
  request.cookies.set("dashboard", "user");
}
