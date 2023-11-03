'use client';
import { useRouter } from 'next-nprogress-bar';

import AuthenticationLayout from '../login/components/authentication-layout';
import Structure from './components/structure';

export default function CreateOrg() {
  const router = useRouter();
  return (
    <AuthenticationLayout
      closeButonProps={{
        onClick: () => router.back(),
      }}
    >
      <Structure />
    </AuthenticationLayout>
  );
}
