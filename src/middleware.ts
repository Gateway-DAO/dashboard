import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  if(request.cookies.get('next-auth.session-token') && request.cookies.get('dashboard-session')) {
    response.cookies.delete("dashboard-session")
  }
  if (request.nextUrl.pathname.includes('/dashboard/user')) {
    response.cookies.set("dashboard-session", 'user')
  }
  if (request.nextUrl.pathname.includes('/dashboard/org')) {
    response.cookies.set("dashboard-session", 'org')
  }
  return response;
}
