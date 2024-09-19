'use client';
import { usePathname } from 'next/navigation';
import { PropsWithChildren, ReactNode } from 'react';

import ExpirementOutlined from '@/components/icons/expirement-outlined';
import externalLinks from '@/constants/externalLinks';
import { currentEnv } from '@/utils/env';

import { List, Typography } from '@mui/material';
import { Stack } from '@mui/system';

import GTWMenuItem from '../menu-item';
import { dashboardDevelopersMenuItems } from './dashboard-developer-menu-items';
import dashboardUserMenuItems from './dashboard-menu-items';

type Props = {
  onCloseSidebar?: () => void;
};

export default function MenuContainer({
  onCloseSidebar,
}: PropsWithChildren<Props>) {
  const activePath = usePathname();

  return (
    <Stack
      sx={{
        flexGrow: 1,
        '@media screen and (max-height: 900px) and (min-width: 1200px)': {
          overflowY: 'auto',
          overflowX: 'hidden',
          my: 2,
          '&::-webkit-scrollbar': {
            width: 5,
          },
          '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 5px #ddd',
            borderRadius: 10,
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: 10,
            backgroundColor: '#dcdcdc',
          },
        },
      }}
    >
      <Stack
        sx={{
          mt: {
            xs: 0,
            lg: 5,
          },
          '@media screen and (max-height: 900px) and (min-width: 1200px)': {
            mt: 2,
          },
        }}
      >
        <Typography variant="caption" sx={{ display: 'block', pl: 1 }}>
          Manage Data
        </Typography>
        <List
          component="ul"
          sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}
        >
          {dashboardUserMenuItems.map(({ activeHrefs, ...item }) => (
            <GTWMenuItem
              key={item.name}
              active={activeHrefs.some((path) => activePath.includes(path))}
              {...item}
              onClick={onCloseSidebar}
            />
          ))}
          {currentEnv === 'production' && (
            <GTWMenuItem
              name="Sandbox"
              href={`${externalLinks.gateway_sandbox}${activePath}`}
              icon={ExpirementOutlined}
              externalLink={true}
              onClick={onCloseSidebar}
            />
          )}
        </List>
      </Stack>
      <Typography variant="caption" sx={{ display: 'block', pl: 1 }}>
        Developers
      </Typography>
      <List
        component="ul"
        sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}
      >
        {dashboardDevelopersMenuItems.map(
          ({ activeHrefs, ...item }, index) =>
            index <= 1 && (
              <GTWMenuItem
                key={item.name}
                active={activeHrefs.some((path) => activePath.includes(path))}
                {...item}
                onClick={onCloseSidebar}
              />
            )
        )}
      </List>
      <Typography variant="caption" sx={{ mt: 2, display: 'block', pl: 1 }}>
        Other Tools
      </Typography>
      <List
        component="ul"
        sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}
      >
        {dashboardDevelopersMenuItems.map(
          ({ activeHrefs, ...item }, index) =>
            index === 2 && (
              <GTWMenuItem
                key={item.name}
                active={activeHrefs.some((path) => activePath.includes(path))}
                {...item}
                onClick={onCloseSidebar}
              />
            )
        )}
      </List>
    </Stack>
  );
}
