import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import routes from '@/constants/routes';
import { authApi } from '@/services/api/api';
import { getServerComponentSession } from '@/services/next-auth/config';
import { PageWithParams } from '@/types/next';

import PDADetailPage from './components/content';

type Props = PageWithParams<{ id: string }>;

const getPDA = async (id: string, token: string) => {
  const intId = parseInt(id, 10);

  const { data, error } = await authApi(token).GET('/data-assets/{id}', {
    params: { path: { id: intId } },
  });
  if (!data || !!error) {
    return null;
  }

  return data;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Obter a sessão do usuário
  const session = await getServerComponentSession();

  // Se não houver sessão, retornar metadata padrão ou redirecionar
  if (!session) {
    return {
      title: 'Data Asset',
    };
  }

  const pda = await getPDA(params.id, session.token);

  if (!pda) {
    return {
      title: 'Data Asset',
    };
  }

  return {
    title: pda.name,
  };
}

export default async function PDAPage({ params }: Props) {
  const session = await getServerComponentSession();

  if (!session) {
    return redirect(routes.home);
  }
  const pda = await getPDA(params.id, session.token);

  if (!pda) {
    return redirect(routes.dashboard.storage);
  }

  return <PDADetailPage pda={pda} backHref={routes.dashboard.storage} />;
}
