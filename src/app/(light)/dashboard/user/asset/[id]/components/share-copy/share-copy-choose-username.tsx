'use client';

import UserIdentityField from '@/components/form/user-identification-field/user-identifier-field';
import useDebouncedHasUser, {
  HasUserState,
} from '@/hooks/use-debounced-username-avaibility';
import { pda as pdaLocale } from '@/locale/en/pda';
import identifierValueSchema, {
  IdentifierValueSchema,
} from '@/schemas/identifier-value';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Check, Close } from '@mui/icons-material';
import { Button, CircularProgress, Stack, Typography } from '@mui/material';

type Props = {
  onSelectUsername: (data: IdentifierValueSchema) => void;
};

export function ShareCopyChooseUsername({ onSelectUsername }: Props) {
  const { control, handleSubmit, clearErrors } = useForm<IdentifierValueSchema>(
    {
      resolver: zodResolver(identifierValueSchema),
      mode: 'onChange',
    }
  );

  const { hasUserState, onCheckUser, onResetFindUser } = useDebouncedHasUser();

  const canShare = hasUserState === HasUserState.Found;

  const onSubmit = async (data: IdentifierValueSchema) => {
    if (!canShare) return;
    onSelectUsername(data);
  };

  return (
    <>
      <Typography
        id="title-choose-gateway-id"
        component="h2"
        variant="h4"
        sx={{ mb: 4 }}
      >
        {pdaLocale.share.share_a_copy_with}
      </Typography>

      <Stack
        component="form"
        gap={4}
        direction={'column'}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack gap={3}>
          <UserIdentityField
            clearErrors={clearErrors}
            control={control}
            addressEndAdorment={
              <>
                {hasUserState === HasUserState.Loading && (
                  <CircularProgress size={16} />
                )}
                {hasUserState === HasUserState.Found && (
                  <Check color="success" />
                )}
                {hasUserState === HasUserState.NotFound && (
                  <Close color="error" />
                )}
              </>
            }
            error={hasUserState === HasUserState.NotFound}
            onChangeType={() => onResetFindUser()}
            onChangeAddress={(event, type) => {
              const value = event.target.value;
              const { success } = identifierValueSchema.safeParse({
                type,
                value,
              });
              console.log(value, success);
              if (success) {
                return onCheckUser({ type, value: event.target.value });
              }
              if (hasUserState !== HasUserState.Idle) {
                onResetFindUser();
              }
            }}
          />
        </Stack>
        <Button
          variant="contained"
          type="submit"
          disabled={!canShare}
          size="large"
        >
          {pdaLocale.share.share_now}
        </Button>
      </Stack>
    </>
  );
}
