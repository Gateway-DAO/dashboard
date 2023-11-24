'use client';

import ErrorMessage from '@/components/form/error-message/error-message';
import UserIdentityField from '@/components/form/user-identification-field/user-identifier-field';
import { common } from '@/locale/en/common';
import { issuePdaForm } from '@/locale/en/pda';
import { UserIdentifierType } from '@/services/protocol/types';
import { numberToMoneyString } from '@/utils/money';
import { useToggle } from '@react-hookz/web';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import { Box, Paper, Stack, TextField, Typography } from '@mui/material';

import Preview from './preview';
import Properties from './properties';
import { IssuePdaSchema, issuePdaValidator } from './schema';
import Summary from './summary';

type Props = {
  schema: any;
};

export default function Form({ schema }: Props) {
  const [isVisible, toggleVisible] = useToggle(false);
  const methods = useForm<IssuePdaSchema>({
    values: {
      owner: {
        type: UserIdentifierType.GatewayId,
        value: '',
      },
      title: '',
      description: '',
      claim: {},
    },
    resolver: async (value, context, options) =>
      issuePdaValidator(value, schema, context, options),
  });

  const amount = 1;
  const price = 0.05;
  const total = numberToMoneyString(amount * price);

  const onSubmit = async (data: IssuePdaSchema) => {
    toggleVisible();
  };

  return (
    <>
      <Stack
        component="form"
        gap={2}
        mb={14}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
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
              type: 'owner.type',
              value: 'owner.value',
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
            <Controller
              control={methods.control}
              name="title"
              render={({ field, fieldState: { error } }) => (
                <>
                  <TextField
                    label="Title"
                    fullWidth
                    {...field}
                    error={!!error}
                  />
                  {error && <ErrorMessage>{error.message}</ErrorMessage>}
                </>
              )}
            />
            <Controller
              control={methods.control}
              name="description"
              render={({ field, fieldState: { error } }) => (
                <>
                  <TextField
                    label="Description"
                    multiline
                    rows={4}
                    fullWidth
                    error={!!error}
                    {...field}
                  />
                  {error && <ErrorMessage>{error.message}</ErrorMessage>}
                </>
              )}
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
        <Summary amount={amount} total={total} />
      </Stack>
      <Preview
        amount={amount}
        price={price}
        total={total}
        isOpen={isVisible}
        onClose={toggleVisible}
      />
    </>
  );
}
