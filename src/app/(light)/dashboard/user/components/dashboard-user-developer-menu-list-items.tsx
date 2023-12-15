'use client';

import { usePathname } from 'next/navigation';

import ExpirementOutlined from '@/components/icons/expirement-outlined';
import MainnetOutlined from '@/components/icons/mainnet-outlined';
import GTWMenuItem from '@/components/menu-item/menu-item';
import externalLinks from '@/constants/externalLinks';
import { common } from '@/locale/en/common';
import { currentEnv } from '@/utils/env';

import { Typography } from '@mui/material';

import { dashboardDevelopersMenuItems } from './dashboard-user-developer-menu-items';

export default function DashboardUserDeveloperMenuListItems() {
  const activePath = usePathname();

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
        name={currentEnv() === 'production' ? 'Sandbox' : 'MainNet'}
        href={
          currentEnv() === 'production'
            ? `${externalLinks.gateway_sandbox}${activePath}`
            : `${externalLinks.gateway}${activePath}`
        }
        icon={
          currentEnv() === 'production' ? ExpirementOutlined : MainnetOutlined
        }
        externalLink={true}
      />
    </>
  );
}
