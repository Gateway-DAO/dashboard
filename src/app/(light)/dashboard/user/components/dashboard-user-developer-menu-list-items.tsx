'use client';

import { usePathname } from 'next/navigation';

import MainnetOutlined from '@/components/icons/mainnet-outlined';
import GTWMenuItem from '@/components/menu-item/menu-item';
import externalLinks from '@/constants/externalLinks';
import { common } from '@/locale/en/common';
import { currentEnv } from '@/utils/env';

import { Typography } from '@mui/material';

import { dashboardDevelopersMenuItems } from './dashboard-user-developer-menu-items';

export default function DashboardUserDeveloperMenuListItems() {
  const activePath = usePathname();

  if (currentEnv === 'production') {
    return null;
  }

  return (
    <>
      <Typography variant="caption" sx={{ px: 3.5, mb: 2, display: 'block' }}>
        {common.general.developers}
      </Typography>
      {dashboardDevelopersMenuItems.map(({ activeHrefs, ...item }) => (
        <GTWMenuItem
          key={item.name}
          active={activeHrefs.some((path) => activePath.includes(path))}
          {...item}
        />
      ))}

      <GTWMenuItem
        name="MainNet"
        href={`${externalLinks.gateway}${activePath}`}
        icon={MainnetOutlined}
        externalLink={true}
      />
    </>
  );
}
