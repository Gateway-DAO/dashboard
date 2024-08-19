import { Metadata } from 'next';

import { DataModelHeader } from './components/data-model-header';
import DataModelList from './components/data-model-list';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Data Model - Gateway Network',
  };
}

export default function DataModelPage() {
  return (
    <>
      <DataModelHeader />

      <DataModelList />
    </>
  );
}
