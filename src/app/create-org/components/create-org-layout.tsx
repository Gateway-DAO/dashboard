'use client';
import { useRouter } from 'next-nprogress-bar';
import { PropsWithChildren } from 'react';

import AuthenticationLayout from '../../login/components/authentication-layout';

export default function CreateOrgLayout({ children }: PropsWithChildren) {
  const router = useRouter();
  return (
    <AuthenticationLayout
      closeButonProps={{
        onClick: () => router.back(),
      }}
    >
      {children}
    </AuthenticationLayout>
  );
}
