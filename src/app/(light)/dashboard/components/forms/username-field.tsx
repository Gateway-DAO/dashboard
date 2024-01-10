import { ChangeEvent, useCallback } from 'react';

import { LoadingButton } from '@/components/buttons/loading-button/loading-button';
import { AvailabilityState } from '@/hooks/use-debounced-username-avaibility';
import { common } from '@/locale/en/common';
import { usernameSchema } from '@/schemas/profile';
import { Control, useController } from 'react-hook-form';

import { Check, Close } from '@mui/icons-material';
import {
  Button,
  CircularProgress,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';

type Props = {
  control: Control<{ username: string }>;
  initialUsername: string;
  helperText: string;
  isLoading: boolean;
  avaibility: AvailabilityState;
  canUpdateUsername: boolean;
  onCancel: () => void;
  onSameUsername: () => void;
  onInvalidUsername: () => void;
  onValidUsername: (username: string) => void;
};

export default function UsernameField({
  control,
  initialUsername,
  helperText,
  isLoading,
  avaibility,
  canUpdateUsername,
  onCancel,
  onSameUsername,
  onInvalidUsername,
  onValidUsername,
}: Props) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: 'username',
    control,
    defaultValue: initialUsername,
  });

  const username = field.value;

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      field.onChange(value);
      if (value === initialUsername) {
        return onSameUsername();
      }

      const { success } = usernameSchema.safeParse(value);
      if (!success && avaibility !== 'idle') {
        return onInvalidUsername();
      }
      if (success) {
        return onValidUsername(value);
      }
    },
    [initialUsername]
  );

  return (
    <>
      <TextField
        id="username"
        label={common.general.username}
        {...field}
        onChange={onChange}
        error={!!error || avaibility === 'invalid'}
        helperText={helperText}
        disabled={!canUpdateUsername}
        InputProps={{
          startAdornment: <InputAdornment position="start">@</InputAdornment>,
          endAdornment: (
            <InputAdornment position="end">
              {avaibility === 'loading' && <CircularProgress size={16} />}
              {avaibility === 'success' && <Check color="success" />}
              {avaibility === 'invalid' && <Close color="error" />}
            </InputAdornment>
          ),
        }}
      />
      {username !== initialUsername && canUpdateUsername && (
        <Stack direction="row" alignItems="center" gap={1} sx={{ mt: 2 }}>
          <LoadingButton
            variant="contained"
            type="submit"
            disabled={avaibility !== 'success'}
            isLoading={isLoading}
          >
            {common.actions.save}
          </LoadingButton>
          <Button variant="outlined" type="button" onClick={onCancel}>
            {common.actions.cancel}
          </Button>
        </Stack>
      )}
    </>
  );
}
