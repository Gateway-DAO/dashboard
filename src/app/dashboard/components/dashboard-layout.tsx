import { PropsWithChildren, ReactNode } from 'react';

import { Stack } from '@mui/system';

import Sidebar, { MenuItem } from './sidebar/sidebar';

type Props = {
  content: ReactNode;
  menuItems: Array<MenuItem>;
};

export default function DashboardLayout({
  content,
  children,
  menuItems,
}: PropsWithChildren<Props>) {
  return (
    <Stack direction={'row'}>
      <Sidebar menuItems={menuItems} />
      <Stack>
        <Stack>
          <h1>Dashboard</h1>
          {content}
        </Stack>
        {children}
      </Stack>
    </Stack>
  );
}
