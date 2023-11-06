'use client';
import { Metadata } from 'next';
import { useRouter } from 'next-nprogress-bar';

import AuthenticationLayout from '../login/components/authentication-layout';
import CreateOrgStructure from './components/structure';

export const metadata: Metadata = {
  title: 'Create Organization - Gateway Network',
};

export default function CreateOrg() {
  const router = useRouter();
  return (
    <AuthenticationLayout
      closeButonProps={{
        onClick: () => router.back(),
      }}
    >
      <CreateOrgStructure />
    </AuthenticationLayout>
  );
}
