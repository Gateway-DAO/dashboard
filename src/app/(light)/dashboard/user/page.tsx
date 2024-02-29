import { redirect } from 'next/navigation';

import routes from '@/constants/routes';

export default function DashboardUser() {
  redirect(routes.dashboard.user.home);
}
