'use client';

import UserIdentityField from '@/components/form/user-identification-field/user-identifier-field';
import { common } from '@/locale/en/common';
import { issuePdaForm } from '@/locale/en/pda';
import { UserIdentifierType } from '@/services/protocol/types';
import { useForm } from 'react-hook-form';

import { Box, Paper, Stack, TextField, Typography } from '@mui/material';

import Properties from './properties';

type Props = {
  schema: any;
};

export default function Form({ schema }: Props) {
  const { control } = useForm({
    values: {
      user: {
        type: UserIdentifierType.Solana,
        value: 'testeeee',
      },
    },
  });

  return (
    <Stack gap={2}>
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
          control={control}
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
          <TextField label="Title" fullWidth />
          <TextField label="Description" multiline rows={4} fullWidth />
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
        <Properties schema={schema} />
      </Paper>
    </Stack>
  );
}
