import { useState } from 'react';

import ErrorMessage from '@/components/form/error-message/error-message';
import UserIdentityField from '@/components/form/user-identification-field/user-identifier-field';
import { queries } from '@/constants/queries';
import { common } from '@/locale/en/common';
import { issuePdaForm } from '@/locale/en/pda';
import identifierValueSchema, {
  IdentifierValueSchema,
} from '@/schemas/identifier-value';
import { apiPublic } from '@/services/protocol/api';
import {
  UserIdentificationInput,
  UserIdentifierType,
} from '@/services/protocol/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm, useFormContext } from 'react-hook-form';

import { Add } from '@mui/icons-material';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';

import { IssuePdaSchema } from '../../schema';
import OwnerPreview from './owner-preview';

export default function OwnerSection() {
  const { control, handleSubmit, setError, reset } = useForm({
    values: {
      type: UserIdentifierType.GatewayId,
      value: '',
    },
    resolver: zodResolver(identifierValueSchema),
  });
  const {
    getFieldState,
    watch,
    setValue: setIssueValue,
  } = useFormContext<IssuePdaSchema>();
  const owner: UserIdentificationInput = watch('owner');

  const { error: issueError } = getFieldState('owner');

  const [ownerPreview, setOwnerPreview] = useState<{
    name: string;
    gatewayId?: string;
    picture?: string;
    type: UserIdentifierType;
  }>();

  const userGatewayId = useMutation({
    mutationKey: [queries.user_info],
    mutationFn: async (identification: IdentifierValueSchema) => {
      const userData = await apiPublic.get_user_info({ identification });
      return userData;
    },
  });

  const onAdd = async (data: IdentifierValueSchema) => {
    try {
      if (data.type === UserIdentifierType.GatewayId) {
        const res = await userGatewayId.mutateAsync(data);
        if (!res.user) {
          return setError('value', {
            type: 'manual',
            message: 'User not found',
          });
        }
        const name = res.user.displayName ?? res.user.gatewayId!;
        const gatewayId = res.user.displayName
          ? res.user.gatewayId!
          : undefined;
        const picture = res.user.profilePicture!;

        setOwnerPreview({
          name,
          gatewayId,
          picture,
          type: data.type,
        });
        return setIssueValue('owner', data);
      }
      setOwnerPreview({
        name: data.value,
        type: data.type,
      });
      reset();
    } catch (error) {
      console.log(error);
      setError('value', {
        type: 'manual',
        message: 'Error',
      });
    }
  };

  const onRemove = () => {
    reset();
    setIssueValue('owner', {
      type: UserIdentifierType.GatewayId,
      value: '',
    });
    setOwnerPreview(undefined);
  };

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
        <Stack
          component="form"
          direction="row"
          gap={1}
          width="100%"
          alignItems="flex-start"
          onSubmit={handleSubmit(onAdd)}
        >
          <UserIdentityField
            control={control}
            disabled={!!owner.value.length}
            sx={{ flexGrow: 1 }}
          />
          <Button
            variant="outlined"
            type="submit"
            disabled={!!owner.value.length}
            sx={{ height: 57 }}
            endIcon={<Add />}
          >
            {common.actions.add}
          </Button>
        </Stack>
        {issueError && <ErrorMessage>{issueError.message}</ErrorMessage>}
      </Box>
      {!!owner.value.length && !!ownerPreview && (
        <OwnerPreview
          name={ownerPreview.name}
          gatewayId={ownerPreview?.gatewayId}
          picture={ownerPreview?.picture}
          onRemove={onRemove}
          owner={owner}
        />
      )}
    </Paper>
  );
}
