'use client';

import { issuePdaForm } from '@/locale/en/pda';
import { DataModelByIdQuery } from '@/services/protocol/types';

import { Stack, Typography } from '@mui/material';

import Form from './form/form';

type Props = {
  dataModel: DataModelByIdQuery['dataModel'];
};

export default function IssuePdaForm({ dataModel }: Props) {
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
      <Form dataModel={dataModel} />
    </Stack>
  );
}
