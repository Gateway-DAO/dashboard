'use client';

import { usePathname } from 'next/navigation';

import { ExpirementOutlined } from '@/components/icons';
import GTWMenuItem from './menu-item';
import externalLinks from '@/constants/externalLinks';
import { currentEnv } from '@/utils/env';

import dashboardUserMenuItems from './dashboard-menu-items';

/**
 * List all menu items of the desktop user dashboard
 */
export default function DashboardUserMenuListItems() {
  const activePath = usePathname();

  return (
    <>
      {dashboardUserMenuItems.map(({ activeHrefs, ...item }) => (
        <GTWMenuItem
          key={item.name}
          active={activeHrefs.some((path) => activePath.includes(path))}
          {...item}
        />
      ))}
      {currentEnv === 'production' && (
        <GTWMenuItem
          name="Sandbox"
          href={`${externalLinks.gateway_sandbox}${activePath}`}
          icon={ExpirementOutlined}
          externalLink={true}
        />
      )}
    </>
  );
}
