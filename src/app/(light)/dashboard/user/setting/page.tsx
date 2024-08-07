
import { Metadata } from 'next';

import TitleLayout from '@/components/title-layout/title-layout';

import DisplayComponents from './components/display-components';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Mangae Gateway ID - Gateway Network',
  };
}

export default async function SettingPage() {
  return (
    <>
      <TitleLayout
        titleId="settings-title"
        title={'Gateway ID'}
        subtitle={'Edit your Gateway ID and manage your connected wallet'}
      />
      <DisplayComponents />
    </>
  );
}
