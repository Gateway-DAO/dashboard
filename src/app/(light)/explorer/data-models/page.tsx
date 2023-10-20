import { Divider } from '@mui/material';

import ExplorerHeader from '../components/header/header';
import DataModelsExplorerFeatured from './featured';
import DataModelsExplorerHeader from './header';
import DataModelsExplorerSearch from './search/search';

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
