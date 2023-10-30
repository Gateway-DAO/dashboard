import Link from 'next/link';

import routes from '@/constants/routes';

export default function ExplorerHome() {
  return (
    <>
      <Link href={routes.dashboard.user.home}>Go to dashboard</Link>
    </>
  );
}
