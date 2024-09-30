import { Metadata } from 'next';

import MyDataModels from './components/my-data-models';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Created Data Models',
  };
}

export default function DataModelPage() {
  return <MyDataModels />;
}
