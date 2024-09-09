import DataModelOutlinedIcon from '@/components/icons/data-model-outlined';
import StorageIcon from '@/components/icons/storage';
import routes from '@/constants/routes';

import { GTWMenuItemSettings } from './menu-item';

/**
 * List all menu items of the user dashboard
 */
const dashboardUserMenuItems: GTWMenuItemSettings[] = [
  {
    name: 'Storage',
    href: routes.dashboard.storage,
    activeHrefs: [routes.dashboard.storage],
    icon: StorageIcon,
    navbar: true,
  },
  {
    name: 'Data Models',
    href: routes.dashboard.myDataModels,
    activeHrefs: [routes.dashboard.myDataModels],
    icon: DataModelOutlinedIcon,
    navbar: true,
  },
];

export default dashboardUserMenuItems;
