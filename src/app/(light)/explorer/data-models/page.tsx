import { Divider } from '@mui/material';

import ExplorerHeader from '../components/header/header';
import DataModelsExplorerFeatured from './components/featured';
import DataModelsExplorerHeader from './components/header';
import DataModelsExplorerSearch from './components/search/search';

export default function DataModelsExplorerPage() {
  return (
    <>
      <ExplorerHeader
        sx={{
          backgroundColor: 'primary.light',
        }}
      >
        <DataModelsExplorerHeader />
      </ExplorerHeader>
      <DataModelsExplorerFeatured />
      <Divider />
      <DataModelsExplorerSearch />
    </>
  );
}
