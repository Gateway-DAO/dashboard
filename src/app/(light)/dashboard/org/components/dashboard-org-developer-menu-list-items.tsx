'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import ExpirementOutlined from '@/components/icons/expirement-outlined';
import MainnetOutlined from '@/components/icons/mainnet-outlined';
import GTWMenuItem from '@/components/menu-item/menu-item';
import externalLinks from '@/constants/externalLinks';
import routes from '@/constants/routes';
import { useGtwSession } from '@/context/gtw-session-provider';
import useOrganization from '@/hooks/use-organization';
import { common } from '@/locale/en/common';
import { CONTAINER_PX } from '@/theme/config/style-tokens';
import { currentEnv } from '@/utils/env';

import { Typography } from '@mui/material';

import dashboardOrgDevelopersMenuItems from './dashboard-org-developer-menu-items';

/**
 * List all menu items of the desktop org dashboard
 */
export default function DashboardOrgDeveloperMenuListItems() {
  const activePath = usePathname();
  const { pathnameOrg } = useOrganization();

  const menuItems = useMemo(
    () =>
      pathnameOrg ? dashboardOrgDevelopersMenuItems(pathnameOrg) : undefined,
    [pathnameOrg]
  );

  return (
    <>
      {menuItems && (
        <>
          <Typography
            variant="caption"
            sx={{ px: CONTAINER_PX, mx: -2.5, mb: 2, display: 'block' }}
          >
            {common.general.developers}
          </Typography>
          {menuItems?.map(({ activeHrefs, ...item }) => (
            <GTWMenuItem
              key={item.name}
              active={activeHrefs.some((path) => activePath.includes(path))}
              {...item}
            />
          ))}
          <GTWMenuItem
            name={currentEnv === 'production' ? 'Sandbox' : 'MainNet'}
            href={
              currentEnv === 'production'
                ? `${externalLinks.gateway_sandbox}${activePath}`
                : `${externalLinks.gateway}${activePath}`
            }
            icon={
              currentEnv === 'production' ? ExpirementOutlined : MainnetOutlined
            }
            externalLink={true}
          />
        </>
      )}
    </>
  );
}
