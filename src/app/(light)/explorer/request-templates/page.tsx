import { explorerRequestTemplates } from '@/locale/en/request-template';

import { Divider } from '@mui/material';

import ExplorerHero from '../components/hero/hero';
import RequestTemplatesExplorerFeatured from './components/featured';
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
