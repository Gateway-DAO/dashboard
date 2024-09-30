import { Metadata } from 'next';

import NetworkDataModels from './components/network-data-models';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Network Data Models',
  };
}

export default function DataModelPage() {
  return <NetworkDataModels />;
}
