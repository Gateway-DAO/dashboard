import { issuePdaForm } from '@/locale/en/pda';
import { apiPublic } from '@/services/protocol/api';

import { Stack, Typography } from '@mui/material';

import Form from './components/form';
export default async function IssueDataAsset() {
  const { dataModel } = await apiPublic.dataModelById({
    id: '1062d449-4ace-49d1-9b3b-1a8490ec89bf',
  });

  return (
    <Stack sx={{ my: 2, maxWidth: 660, margin: '0 auto' }}>
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          fontWeight: 600,
        }}
      >
        {issuePdaForm.title}
      </Typography>
      <Typography variant="h3" component="h1">
        {issuePdaForm.subtitle}
      </Typography>
      <Form schema={dataModel.schema} />
    </Stack>
  );
}
