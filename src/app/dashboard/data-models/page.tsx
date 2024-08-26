import { Metadata } from 'next';

import DataModelList from './components/data-model-list';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Data Model - Gateway Network',
  };
}

export default function DataModelPage() {
  return (
    <>
      <DataModelList />
    </>
  );
}
