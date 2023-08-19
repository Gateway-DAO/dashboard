import { PropsWithChildren } from 'react';

import Box, { BoxProps } from '@mui/material/Box';

export function a11yTabProps(id: string, key: number) {
  return {
    id: `${id}-tab-${key}`,
    'aria-controls': `${id}-tabpanel-${key}`,
  };
}

export function a11yTabPanelProps(id: string, key: number) {
  return {
    id: `${id}-tabpanel-${key}`,
    'aria-labelledby': `${id}-tab-${key}`,
  };
}

export type TabPanelProps = {
  tabsId: string;
  index: number;
  active: boolean;
} & Partial<BoxProps>;

export function TabPanel({
  tabsId,
  index,
  active,
  children,
  ...props
}: PropsWithChildren<TabPanelProps>) {
  return (
    <Box {...a11yTabPanelProps(tabsId, index)} hidden={!active} {...props}>
      {children}
    </Box>
  );
}
