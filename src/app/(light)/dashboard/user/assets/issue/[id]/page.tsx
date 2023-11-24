import { issuePdaForm } from '@/locale/en/pda';
import { apiPublic } from '@/services/protocol/api';
import { PageProps } from '@/types/next';

import { Stack, Typography } from '@mui/material';

import Form from './components/form';
export default async function IssueDataAsset({
  params: { id },
}: PageProps<{ id: string }>) {
  const { dataModel } = await apiPublic.dataModelById({
    id,
  });

  return (
    <Stack sx={{ my: 2, maxWidth: 660, margin: '0 auto' }}>
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          fontWeight: 600,
        }}
        mb={1}
      >
        {issuePdaForm.title}
      </Typography>
      <Typography variant="h3" component="h1" mb={6}>
        {issuePdaForm.subtitle}
      </Typography>
      <Form schema={dataModel.schema} />
    </Stack>
  );
}
