import { Metadata } from 'next';

import CreateOrgLayout from './components/create-org-layout';
import CreateOrgStructure from './components/structure';

export const metadata: Metadata = {
  title: 'Create Organization - Gateway Network',
};

export default function CreateOrg() {
  return (
    <CreateOrgLayout>
      <CreateOrgStructure />
    </CreateOrgLayout>
  );
}
