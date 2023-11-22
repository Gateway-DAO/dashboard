'use client';

import UserIdentityField from '@/components/form/user-identification-field/user-identifier-field';
import { common } from '@/locale/en/common';
import { issuePdaForm } from '@/locale/en/pda';
import { UserIdentifierType } from '@/services/protocol/types';
import { FormProvider, useForm } from 'react-hook-form';

import { Box, Paper, Stack, TextField, Typography } from '@mui/material';

import Properties from './properties';
import Summary from './summary';

type Props = {
  schema: any;
};

export default function Form({ schema }: Props) {
  const methods = useForm({
    values: {
      user: {
        type: UserIdentifierType.Solana,
        value: 'testeeee',
      },
      title: '',
      description: '',
    },
  });

  return (
    <>
      <Stack gap={2} mb={14}>
        <Paper
          component={Stack}
          elevation={0}
          sx={{ p: 3, border: 1, borderColor: 'divider' }}
          gap={4}
        >
          <Box>
            <Typography variant="h5">{issuePdaForm.issue_to.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {issuePdaForm.issue_to.description}
            </Typography>
          </Box>
          <UserIdentityField
            control={methods.control}
            names={{
              type: 'user.type',
              value: 'user.value',
            }}
          />
        </Paper>
        <Paper
          component={Stack}
          elevation={0}
          sx={{ p: 3, border: 1, borderColor: 'divider' }}
          gap={4}
        >
          <Typography variant="h5">{common.general.details}</Typography>
          <Stack gap={3}>
            <TextField label="Title" fullWidth {...methods.register('title')} />
            <TextField
              label="Description"
              multiline
              rows={4}
              fullWidth
              {...methods.register('description')}
            />
          </Stack>
        </Paper>
        <Paper
          component={Stack}
          elevation={0}
          sx={{ p: 3, border: 1, borderColor: 'divider' }}
          gap={4}
        >
          <Box>
            <Typography variant="h5">{common.general.claim}</Typography>
            <Typography variant="body2" color="text.secondary">
              {issuePdaForm.claim.description}
            </Typography>
          </Box>
          <FormProvider {...methods}>
            <Properties schema={schema} />
          </FormProvider>
        </Paper>
      </Stack>
      <Summary amount={1} price={0.05} onSubmit={() => console.log('submit')} />
    </>
  );
}
