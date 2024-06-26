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
    name: 'Structured Data',
    href: routes.explorer.dataModels,
    activeHrefs: [
      routes.explorer.dataModels,
      routes.explorer.dataModelIssuers(''),
      routes.explorer.dataModelRequestTemplates(''),
    ],
  },
  {
    name: 'Request Data',
    href: routes.explorer.requestTemplates,
    activeHrefs: [
      routes.explorer.requestTemplates,
      routes.explorer.requestTemplateVerifiers(''),
      routes.explorer.requestTemplatePlayground(''),
    ],
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
