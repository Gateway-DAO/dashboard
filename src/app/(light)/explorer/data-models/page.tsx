import { explorerDataModels } from '@/locale/en/datamodel';

import { Divider } from '@mui/material';

import ExplorerHero from '../components/hero/hero';
import DataModelsExplorerFeatured from './components/featured';
import DataModelsExplorerSearch from './components/search/search';

export default function DataModelsExplorerPage() {
  return (
    <>
      <ExplorerHero
        title={explorerDataModels.title}
        subtitle={explorerDataModels.subtitle}
        help={explorerDataModels.help}
        infoCard
        sx={{
          backgroundColor: 'primary.50',
        }}
      />
      <DataModelsExplorerFeatured />
      <Divider />
      <DataModelsExplorerSearch />
    </>
  );
}
