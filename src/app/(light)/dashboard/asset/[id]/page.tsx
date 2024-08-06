'use client';

import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import routes from '@/constants/routes';

import PDADetailPage from './components/content';
import { mockPrivateDataAssets } from '@/services/server/mock-types';

export default async function PDAPage({ params }: { params: { id: string } }) {
  const pda = mockPrivateDataAssets.find(
    (pda) => pda.id === parseInt(params.id, 10)
  );

  if (!pda) {
    return redirect(routes.dashboard.user.home);
  }

  const isOwner = true;

  return (
    <PDADetailPage
      isOwner={isOwner}
      pda={pda}
      backHref={routes.dashboard.user.home}
    />
  );
}
