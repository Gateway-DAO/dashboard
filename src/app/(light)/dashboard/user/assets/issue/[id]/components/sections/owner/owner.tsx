import { useEffect, useState } from 'react';

import ErrorMessage from '@/components/form/error-message/error-message';
import UserIdentityField from '@/components/form/user-identification-field/user-identifier-field';
import { queries } from '@/constants/queries';
import { common } from '@/locale/en/common';
import { issuePdaForm } from '@/locale/en/pda';
import { apiPublic } from '@/services/protocol/api';
import {
  Get_User_InfoQuery,
  UserIdentificationInput,
  UserIdentifierType,
} from '@/services/protocol/types';
import { limitCharsCentered } from '@/utils/string';
import { useMutation } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';

import { Box, Button, Paper, Stack, Typography } from '@mui/material';

import OwnerPreview from './owner-preview';

export default function OwnerSection() {
  const { control, getFieldState, watch, setError, clearErrors, setValue } =
    useFormContext();
  const ownerDraft: UserIdentificationInput = watch('ownerDraft');
  const owner: UserIdentificationInput = watch('owner');
  const { error } = getFieldState('owner');
  const initialOwnerPreviewData = {
    name: '',
    gatewayId: '',
    picture: '',
  };
  const [ownerPreview, setOwnerPreview] = useState<{
    name: string;
    gatewayId?: string;
    picture?: string;
  }>(initialOwnerPreviewData);

  useEffect(() => {
    clearErrors('ownerDraft.value');
  }, [ownerDraft?.value]);

  const setOwnerPreviewGatewayId = (userData: Get_User_InfoQuery) => {
    setValue('owner', ownerDraft);
    setValue('ownerDraft.value', '');
    const name =
      userData.user?.displayName ??
      userData.user?.gatewayId ??
      limitCharsCentered(userData.user?.id as string, 10) ??
      '';
    const gatewayId =
      userData.user?.gatewayId ??
      (limitCharsCentered(userData.user?.id as string, 10) as string);
    setOwnerPreview({
      name,
      gatewayId,
      picture: userData.user?.profilePicture as string,
    });
  };

  const setOwnerPreviewOthers = () => {
    setOwnerPreview({
      name: ownerDraft.value ?? '',
    });
    setValue('owner', ownerDraft);
    setValue('ownerDraft.value', '');
  };

  const userGatewayId = useMutation({
    mutationKey: [queries.user_info, ownerDraft?.type, ownerDraft?.value],
    mutationFn: async () => {
      const userData = await apiPublic.get_user_info({
        identification: {
          type: ownerDraft?.type,
          value: ownerDraft?.value,
        },
      });

      if (userData?.user) {
        setOwnerPreviewGatewayId(userData);
      } else {
        setError('ownerDraft.value', {
          type: 'manual',
          message: 'User not found',
        });
      }

      return userData;
    },
  });

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
        <Stack direction="row" gap={1} width="100%" alignItems="flex-start">
          <UserIdentityField
            control={control}
            names={{
              type: 'ownerDraft.type',
              value: 'ownerDraft.value',
            }}
            disabled={!!owner.value}
            sx={{ flexGrow: 1 }}
          />
          <Button
            variant="outlined"
            onClick={() => {
              if (ownerDraft.type === UserIdentifierType.GatewayId) {
                userGatewayId.mutate();
              } else {
                setOwnerPreviewOthers();
              }
            }}
            disabled={!ownerDraft.value}
            sx={{ height: 57 }}
          >
            {common.actions.add}
          </Button>
        </Stack>
        {error && <ErrorMessage>{error.message}</ErrorMessage>}
      </Box>
      {owner.value && (
        <OwnerPreview
          name={ownerPreview.name}
          gatewayId={ownerPreview?.gatewayId}
          picture={ownerPreview?.picture}
          onRemove={() => {
            setValue('owner.value', undefined);
            setOwnerPreview(initialOwnerPreviewData);
            console.log(owner.value);
          }}
          owner={owner}
        />
      )}
    </Paper>
  );
}
