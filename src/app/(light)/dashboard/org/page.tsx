import { redirect } from 'next/navigation';

import routes from '@/constants/routes';

export default function OrgRootPage() {
  // No org parameter, redirect to user dashboard
  redirect(routes.dashboard.user.home);
}
