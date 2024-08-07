import { Metadata } from 'next';

import TitleLayout from '@/components/title-layout/title-layout';

import DeveloperPortal from './components/developer-portal';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Get Started - Gateway Network',
  };
}

export default async function DeveloperAccessPage() {
  return (
    <>
      <TitleLayout
        titleId="api-details"
        title={'API'}
        subtitle={`Here's all the info needed to connect to our API.`}
      />
      <DeveloperPortal />
    </>
  );
}
