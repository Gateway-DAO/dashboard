import { ReactNode, Suspense } from 'react';

import TitleLayout from '@/components/title-layout/title-layout';
import {
  CONTAINER_PX,
  NEGATIVE_CONTAINER_PX,
} from '@/theme/config/style-tokens';

import { Box } from '@mui/material';

import { ConnectedTabs, Tabs } from './tabs';

type Props = {
  children?: ReactNode;
};

export function DataModelHeader({ children }: Props) {
  return (
    <>
      <TitleLayout
        titleId="data-model-title"
        title={'Data Models'}
        subtitle={
          'These are the data model you have created and all on the network'
        }
      >
        {children && children}
      </TitleLayout>

      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          mx: NEGATIVE_CONTAINER_PX,
          px: CONTAINER_PX,
        }}
      >
        <Suspense fallback={<Tabs />}>
          <ConnectedTabs />
        </Suspense>
      </Box>
    </>
  );
}
