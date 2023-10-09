import { LoadingButton } from '@/components/buttons/loading-button/loading-button';
import UserIdentityField from '@/components/form/user-identification-field/user-identifier-field';
import { useGtwSession } from '@/context/gtw-session-provider';
import useOrganization from '@/hooks/use-organization';
import {
  ErrorMessage,
  errorMessages,
  getErrorMessage,
} from '@/locale/en/errors';
import { orgSettings } from '@/locale/en/settings';
import {
  Add_Org_UserMutationVariables,
  OrganizationRole,
} from '@/services/protocol/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';

import { Schema, schema } from './schema';

type Props = {
  onSuccess: () => void;
};

export default function AddMemberForm({ onSuccess }: Props) {
  const { privateApi } = useGtwSession();
  const { organization } = useOrganization();

  const { enqueueSnackbar } = useSnackbar();

  const addMember = useMutation({
    mutationKey: ['add-member'],
    mutationFn: (data: Add_Org_UserMutationVariables) =>
      privateApi.add_org_user(data),
  });

  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
    mode: 'all',
  });

  const handleMutation = async (data: Schema) => {
    try {
      await addMember.mutateAsync({
        id: organization?.id ?? '',
        ...data,
      });
      enqueueSnackbar(orgSettings.addMember.success, { variant: 'success' });
      onSuccess();
    } catch (error: any) {
      const message = getErrorMessage(error);

      if (message === 'USER_NOT_FOUND' || message === 'DUPLICATED_MEMBERS') {
        methods.setError('value', {
          type: 'manual',
          message: errorMessages[message],
        });
        return;
      }

      enqueueSnackbar(
        errorMessages[message] ?? errorMessages.UNEXPECTED_ERROR,
        { variant: 'error' }
      );
    }
  };

  return (
    <Stack
      component="form"
      id="add-member-form"
      onSubmit={methods.handleSubmit(handleMutation)}
    >
      <Typography
        component="h3"
        fontSize={34}
        id="add-member-title"
        sx={{ mb: 6 }}
      >
        {orgSettings.addMember.title(
          organization?.name ?? `@${organization?.gatewayId}` ?? ''
        )}
      </Typography>
      <UserIdentityField
        clearErrors={methods.clearErrors}
        control={methods.control as any}
        sx={{ mb: 1 }}
      />
      <FormControl
        sx={{
          mt: 1,
          width: {
            xs: '100%',
            sm: 220,
          },
        }}
      >
        <InputLabel id="role-select-label">Role</InputLabel>
        <Select
          labelId="role-select-label"
          id="role-select"
          label="Role"
          {...methods.register('role')}
        >
          <MenuItem value={OrganizationRole.Member}>Member</MenuItem>
          <MenuItem value={OrganizationRole.Admin}>Admin</MenuItem>
        </Select>
      </FormControl>
      <LoadingButton
        variant="contained"
        type="submit"
        sx={{
          mt: 3,
        }}
        id="add-member-action"
        disabled={!methods.formState.isValid}
        isLoading={addMember?.isLoading}
      >
        {orgSettings.addMember.add_member}
      </LoadingButton>
    </Stack>
  );
}
