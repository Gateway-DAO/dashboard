import { ChangeEvent } from 'react';

import { common } from '@/locale/en/common';
import { IdentifierValueSchema } from '@/schemas/identifier-value';
import { UserIdentifierType } from '@/services/protocol-v3/types';
import { Control, useController } from 'react-hook-form';

import {
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  SxProps,
  TextField,
  Typography,
} from '@mui/material';

import { useIdentifierTypes } from './use-identifier-types';

type Props = {
  control: Control<any>;
  error?: boolean;
  helperText?: string;
  clearErrors?: () => void;
  sx?: SxProps;
  // Maps to react-hook-form names
  names?: {
    type?: string;
    value?: string;
  };
  defaultValues?: {
    type?: UserIdentifierType;
    value?: string;
  };
  disabled?: boolean;
  onSubmit?: (data: IdentifierValueSchema) => void;
  addressEndAdorment?: JSX.Element;
  onChangeType?: (event: SelectChangeEvent<string>) => void;
  onChangeAddress?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: UserIdentifierType
  ) => void;
};

export default function UserIdentityField({
  control,
  error,
  clearErrors,
  helperText,
  sx,
  names,
  defaultValues,
  disabled = false,
  addressEndAdorment: endAdornment,
  onChangeType,
  onChangeAddress,
}: Props) {
  const identifierTypes = useIdentifierTypes();

  const typeField = useController<IdentifierValueSchema>({
    control,
    name: (names?.type as 'type') ?? 'type',
    defaultValue: defaultValues?.type ?? UserIdentifierType.Username,
  });

  const addressField = useController<IdentifierValueSchema>({
    control,
    name: (names?.value as 'value') ?? 'value',
    defaultValue: defaultValues?.value ?? '',
  });

  return (
    <Stack gap={1} sx={{ flexDirection: { xs: 'column', md: 'row' }, ...sx }}>
      <FormControl sx={{ width: { xs: '100%', md: 220 } }}>
        <InputLabel htmlFor="type">{common.identifier.type}</InputLabel>
        <Select
          label={common.identifier.type}
          error={!!typeField.fieldState.error || !!error}
          id="field-identifier-type"
          sx={{ mb: { xs: 1, md: 0 } }}
          inputProps={{ defaultValue: UserIdentifierType.Username }}
          {...typeField.field}
          onChange={(event) => {
            typeField.field.onChange(event);
            addressField.field.onChange('');
            onChangeType?.(event);
            clearErrors?.();
          }}
          disabled={disabled}
        >
          {identifierTypes.map((type) => (
            <MenuItem
              key={type?.value}
              value={type?.value}
              sx={{ width: '100%', py: 2 }}
            >
              <Stack direction="row" alignItems="center" gap={1}>
                <Typography sx={{ display: 'block', color: 'text.secondary' }}>
                  {type?.name}
                </Typography>
              </Stack>
            </MenuItem>
          ))}
        </Select>
        {!!typeField.fieldState.error && (
          <FormHelperText sx={{ color: 'error' }}>
            {typeField.fieldState.error.message}
          </FormHelperText>
        )}
      </FormControl>
      <TextField
        required
        id="field-address"
        {...addressField.field}
        onChange={(event) => {
          addressField.field.onChange(event);
          onChangeAddress?.(event, typeField.field.value as UserIdentifierType);
        }}
        error={!!addressField.fieldState.error || !!error}
        helperText={addressField.fieldState.error?.message || helperText}
        type="text"
        inputMode={
          addressField.field.value === UserIdentifierType.Email
            ? 'email'
            : 'text'
        }
        sx={{ flexGrow: 1 }}
        disabled={disabled}
        InputProps={{
          startAdornment: typeField.field.value ===
            UserIdentifierType.Username && (
            <InputAdornment position="start">@</InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">{endAdornment}</InputAdornment>
          ),
        }}
      />
    </Stack>
  );
}
