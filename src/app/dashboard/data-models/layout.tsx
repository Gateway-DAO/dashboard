import { PropsWithChildren } from 'react';

import { DataModelHeader } from './components/header/data-model-header';

export default function DataModelsLayout({ children }: PropsWithChildren) {
  return (
    <>
      <DataModelHeader />

      {children}
    </>
  );
}
