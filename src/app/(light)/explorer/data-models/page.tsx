import { Metadata } from 'next';

import { explorerDataModels } from '@/locale/en/datamodel';

import { Divider } from '@mui/material';

import ExplorerHero from '../components/hero/hero';
import DataModelsExplorerFeatured from './components/featured';
import DataModelsExplorerSearch from './components/search/search';

export const metadata: Metadata = {
  title: `Gateway Data Models`,
  description: `Discover a diverse range of data models on Gateway Platform. Find the perfect solution for your business needs.`,
};

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
