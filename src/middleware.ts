import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  // If user logged off from dashboard, delete dashboard-session cookie
  if (
    !request.cookies.get('next-auth.session-token') &&
    request.cookies.get('dashboard-session')
  ) {
    response.cookies.delete('dashboard-session');
    response.cookies.delete('dashboard-org');
  }

  // TODO: Check if user is logged in

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // When the user is navigating on the user dashboard, set the dashboard-session cookie to user
    if (request.nextUrl.pathname.startsWith('/dashboard/user')) {
      response.cookies.set('dashboard-session', 'user');
      response.cookies.delete('dashboard-org');
    }
    // When the user is navigating on the org dashboard, set the dashboard-session cookie to org and set the dashboard-org cookie to the org name
    if (request.nextUrl.pathname.startsWith('/dashboard/org')) {
      const orgName = request.nextUrl.pathname.split('/')[3];
      response.cookies.set('dashboard-session', 'org');
      response.cookies.set('dashboard-org', orgName);
    }
    // When the user is navigating to a shared proof page, redirect to the user or org proof dashboard
    if (request.nextUrl.pathname.startsWith('/dashboard/proof')) {
      if (request.cookies.get('dashboard-session')?.value === 'user') {
        return NextResponse.rewrite(
          new URL(`/dashboard/user/proof`, request.url)
        );
      }
      if (request.cookies.get('dashboard-session')?.value === 'org') {
        const orgName = request.cookies.get('dashboard-org')?.value;
        return NextResponse.rewrite(
          new URL(`/dashboard/org/${orgName}/proof`, request.url)
        );
      }
    }
  }

  return response;
}
