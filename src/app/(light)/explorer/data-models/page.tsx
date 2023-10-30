import { explorerDataModels } from '@/locale/en/datamodel';

import { Divider } from '@mui/material';

import ExplorerHeader from '../components/header/header';
import DataModelsExplorerFeatured from './components/featured';
import DataModelsExplorerSearch from './components/search/search';

export default function DataModelsExplorerPage() {
  return (
    <>
      <ExplorerHeader
        title={explorerDataModels.title}
        subtitle={explorerDataModels.subtitle}
        help={explorerDataModels.help}
        sx={{
          backgroundColor: 'primary.light',
        }}
      />
      <DataModelsExplorerFeatured />
      <Divider />
      <DataModelsExplorerSearch />
    </>
  );
}
