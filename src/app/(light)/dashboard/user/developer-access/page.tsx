import { Metadata } from 'next';

import TitleLayout from '@/components/title-layout/title-layout';
import { developer_access } from '@/locale/en/developer-access';

import DeveloperPortal from '../settings/components/developer-portal/developer-portal';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Get Started - Gateway Network',
  };
}

export default async function DeveloperAccessPage() {
  return (
    <>
      <TitleLayout
        titleId="developer-access-title"
        title={developer_access.title}
        subtitle={developer_access.subtitle}
      />
      <DeveloperPortal />
    </>
  );
}
