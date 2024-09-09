import { Metadata } from 'next';

import MyDataModels from './components/my-data-models';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Data Model - Gateway Network',
  };
}

export default function DataModelPage() {
  return <MyDataModels />;
}
