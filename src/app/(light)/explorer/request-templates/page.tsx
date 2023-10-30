import { explorerRequestTemplates } from '@/locale/en/request-template';

import { Divider } from '@mui/material';

import ExplorerHeader from '../components/header/header';
import RequestTemplatesExplorerFeatured from './components/featured';

export default function RequestTemplatesExplorerPage() {
  return (
    <>
      <ExplorerHeader
        title={explorerRequestTemplates.title}
        subtitle={explorerRequestTemplates.subtitle}
        help={explorerRequestTemplates.help}
        sx={{
          backgroundColor: 'primary.light',
        }}
      />
      <RequestTemplatesExplorerFeatured />
      <Divider />
      Test
    </>
  );
}
