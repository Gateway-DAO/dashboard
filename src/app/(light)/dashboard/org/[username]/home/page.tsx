import { Metadata } from 'next';

import { PageWithParams } from '@/types/next';
import { getCurrentOrg } from '@/utils/currentOrg';

import HomeStructure from '../../../user/home/components/home-structure';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `The Personal Data Asset Network  - Gateway Network`,
  };
}

export default async function Home(
  props: PageWithParams<{ username: string }>
) {
  const pathnameOrg = await props.params?.username;
  const organization = await getCurrentOrg(pathnameOrg);
  return (
    <HomeStructure
      username={organization?.name ?? organization?.gatewayId ?? ''}
    />
  );
}
