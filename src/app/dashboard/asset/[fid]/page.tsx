'use client';

import { redirect } from 'next/navigation';

import routes from '@/constants/routes';
import { mockPublicDataAssets } from '@/services/api/mocks';
import { PageWithParams } from '@/types/next';

import PDADetailPage from './components/content';

export default function PDAPage({ params }: PageWithParams<{ fid: string }>) {
  const pda = mockPublicDataAssets.find((pda) => pda.fid === params.fid);

  if (!pda) {
    return redirect(routes.dashboard.home);
  }

  return <PDADetailPage pda={pda} backHref={routes.dashboard.home} />;
}
