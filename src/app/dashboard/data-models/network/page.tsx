import { Metadata } from 'next';

import NetworkDataModels from './components/network-data-models';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Data Model - Gateway Network',
  };
}

export default function DataModelPage() {
  return <NetworkDataModels />;
}
