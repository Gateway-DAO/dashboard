'use client';

import { redirect } from 'next/navigation';

import routes from '@/constants/routes';
import { mockPrivateDataAssets } from '@/services/api/models';

import PDADetailPage from './components/content';

export default function PDAPage({ params }: { params: { id: string } }) {
  const pda = mockPrivateDataAssets.find((pda) => pda.id === params.id);

  if (!pda) {
    return redirect(routes.dashboard.home);
  }

  return <PDADetailPage pda={pda} backHref={routes.dashboard.home} />;
}
