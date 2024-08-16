import { redirect } from 'next/navigation';

import routes from '@/constants/routes';
import { PageWithParams } from '@/types/next';

export default function OrgPage(props: PageWithParams<{ username: string }>) {
  if (!props.params?.username) {
    redirect(routes.dashboard.user.home);
  }
  redirect(routes.dashboard.org.home(props.params?.username));
}
