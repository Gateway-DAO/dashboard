import { Metadata } from 'next';
import { getSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

import routes from '@/constants/routes';
import { authApi } from '@/services/api/api';
import { mockPublicDataAsset } from '@/services/api/mocks';
import { getServerComponentSession } from '@/services/next-auth/config';
import { PageWithParams } from '@/types/next';

import PDADetailPage from './components/content';

type Props = PageWithParams<{ fid: string }>;

export async function generateMetadata({
  params: { fid },
}: Props): Promise<Metadata> {
  // Obter a sessão do usuário
  const session = await getServerComponentSession();

  // Se não houver sessão, retornar metadata padrão ou redirecionar
  if (!session) {
    return {
      title: 'Data Asset',
    };
  }

  return {
    title: mockPublicDataAsset.name,
  };
}

export default async function PDAPage({ params }: Props) {
  // decode the fid from the URL
  const session = await getServerComponentSession();

  if (!session) {
    return redirect(routes.home);
  }
  // const fid = decodeURIComponent(params.fid);
  // const obj = await authApi(session.token).GET('/data-assets/{id}', {
  //   params: { path: { id: 88068846996422656 } },
  // });

  // if (!data) {
  //   return redirect(routes.dashboard.home);
  // }

  return (
    <PDADetailPage pda={mockPublicDataAsset} backHref={routes.dashboard.home} />
  );
}
