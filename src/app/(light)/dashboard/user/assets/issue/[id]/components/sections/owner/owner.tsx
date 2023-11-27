import ErrorMessage from '@/components/form/error-message/error-message';
import UserIdentityField from '@/components/form/user-identification-field/user-identifier-field';
import { issuePdaForm } from '@/locale/en/pda';
import { useFormContext } from 'react-hook-form';

import { Box, Paper, Stack, Typography } from '@mui/material';

import OwnerPreview from './owner-preview';

export default function OwnerSection() {
  const { control, getFieldState } = useFormContext();

  const { error } = getFieldState('owner');

  return (
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
      <Box>
        <UserIdentityField
          control={control}
          names={{
            type: 'owner.type',
            value: 'owner.value',
          }}
        />
        {error && <ErrorMessage>{error.message}</ErrorMessage>}
      </Box>
      <OwnerPreview />
    </Paper>
  );
}
