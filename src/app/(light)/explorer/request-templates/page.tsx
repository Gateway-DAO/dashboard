import { explorerRequestTemplates } from '@/locale/en/request-template';

import { Divider } from '@mui/material';

import RequestTemplatesExplorerFeatured from '../components/featured-data-request-templates-row/featured';
import ExplorerHero from '../components/hero/hero';
import DataModelsRequestExplorerSearch from './components/search/search';

export default function RequestTemplatesExplorerPage() {
  return (
    <>
      <ExplorerHero
        title={explorerRequestTemplates.title}
        subtitle={explorerRequestTemplates.subtitle}
        help={explorerRequestTemplates.help}
        infoCard
        sx={{
          backgroundColor: 'primary.light',
        }}
      />
      <RequestTemplatesExplorerFeatured />
      <Divider />
      <DataModelsRequestExplorerSearch />
    </>
  );
}
