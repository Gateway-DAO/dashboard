'use client';

import { usePathname } from 'next/navigation';

import MainnetOutlined from '@/components/icons/mainnet-outlined';
import externalLinks from '@/constants/externalLinks';
import { currentEnv, isSandbox } from '@/utils/env';

import { Typography } from '@mui/material';

import { dashboardDevelopersMenuItems } from './dashboard-developer-menu-items';
import GTWMenuItem from './menu-item';

export default function DashboardUserDeveloperMenuListItems() {
  const activePath = usePathname();

  if (currentEnv === 'production') {
    return null;
  }

  return (
    <>
      <Typography variant="caption" sx={{ px: 3.5, mb: 2, display: 'block' }}>
        Developers
      </Typography>

      {dashboardDevelopersMenuItems.map(({ activeHrefs, ...item }) => (
        <GTWMenuItem
          key={item.name}
          active={activeHrefs.some((path) => activePath.includes(path))}
          {...item}
        />
      ))}

      <GTWMenuItem
        name={isSandbox ? 'Sandbox' : 'TestNet'}
        href={`${externalLinks.gateway}${activePath}`}
        icon={MainnetOutlined}
        externalLink={true}
      />
    </>
  );
}
