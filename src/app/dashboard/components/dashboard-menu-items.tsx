import DataModelOutlinedIcon from '@/components/icons/data-model-outlined';
import StorageIcon from '@/components/icons/storage';
import { GTWMenuItemSettings } from './menu-item';
import routes from '@/constants/routes';

/**
 * List all menu items of the user dashboard
 */
export const dashboardUserMenuItems: GTWMenuItemSettings[] = [
  {
    name: 'Storage',
    href: routes.dashboard.user.home,
    activeHrefs: [routes.dashboard.user.home],
    icon: StorageIcon,
    navbar: true,
  },
  {
    name: 'Data Models',
    href: routes.dashboard.user.myDataModels,
    activeHrefs: [routes.dashboard.user.myDataModels],
    icon: DataModelOutlinedIcon,
    navbar: true,
  },
];

export default dashboardUserMenuItems;
