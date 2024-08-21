import { redirect } from 'next/navigation';

import routes from '@/constants/routes';
import { PageWithSearchParams } from '@/types/next';

export default function NewUserPage({
  searchParams,
}: PageWithSearchParams<{
  message: string;
  signature: string;
}>) {
  if (!searchParams?.message || !searchParams?.signature) {
    redirect(routes.home);
  }

  return <div>NewUserPage</div>;
}
