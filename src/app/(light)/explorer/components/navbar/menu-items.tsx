import { GTWMenuItemSettings } from '@/components/menu-item/menu-item';
import { DOCS_BASE_URL } from '@/constants/docs';
import routes from '@/constants/routes';

import { OpenInNew } from '@mui/icons-material';

/**
 * List all menu items of the explorer
 */
export const explorerMenuItems: GTWMenuItemSettings[] = [
  {
    name: 'Transactions',
    href: routes.explorer.transactions,
    activeHrefs: [routes.explorer.transactions],
  },
  {
    name: 'Data models',
    href: routes.explorer.dataModels,
    activeHrefs: [
      routes.explorer.dataModels,
      routes.explorer.dataModelIssuers(''),
      routes.explorer.dataModelRequestTemplates(''),
    ],
  },
  {
    name: 'Data request templates',
    href: routes.dashboard.user.requests,
    activeHrefs: [routes.explorer.requestTemplates],
  },
  {
    name: 'Docs',
    href: `${DOCS_BASE_URL}docs/get-started-here`,
    activeHrefs: [],
    icon: OpenInNew,
    externalLink: true,
  },
];

export default explorerMenuItems;
