import { Metadata } from 'next';
import { PropsWithChildren } from 'react';

import DashboardLayout from './components/dashboard-layout';
import DashboardErrorBoundary from './components/error';

export const metadata: Metadata = {
  title: {
    template: '%s - Gateway Dashboard',
    default: 'Gateway Dashboard',
  },
};

export default function DashboardUserLayout({ children }: PropsWithChildren) {
  return (
    <DashboardErrorBoundary>
      <DashboardLayout>{children}</DashboardLayout>
    </DashboardErrorBoundary>
  );
}
