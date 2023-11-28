import { common } from '@/locale/en/common';
import { IdentifierValueSchema } from '@/schemas/identifier-value';
import { UserIdentifierType } from '@/services/protocol/types';
import { Control, useController } from 'react-hook-form';

import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  SxProps,
  TextField,
  Typography,
} from '@mui/material';

import { useIdentifierTypes } from './use-identifier-types';

type Props = {
  control: Control<any>;
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
};

export default function UserIdentityField({
  control,
  clearErrors,
  sx,
  names,
  defaultValues,
  disabled = false,
}: Props) {
  const identifierTypes = useIdentifierTypes();

  const typeField = useController({
    control,
    name: names?.type ?? 'type',
    defaultValue: defaultValues?.type ?? UserIdentifierType.GatewayId,
  });

  const addressField = useController({
    control,
    name: names?.value ?? 'value',
    defaultValue: defaultValues?.value ?? '',
  });

  return (
    <Stack gap={1} sx={{ flexDirection: { xs: 'column', md: 'row' }, ...sx }}>
      <FormControl sx={{ width: { xs: '100%', md: 220 } }}>
        <InputLabel htmlFor="type">{common.identifier.type}</InputLabel>
        <Select
          label={common.identifier.type}
          error={!!typeField.fieldState.error}
          id="field-identifier-type"
          sx={{ mb: { xs: 1, md: 0 } }}
          inputProps={{ defaultValue: UserIdentifierType.GatewayId }}
          {...typeField.field}
          onChange={(event) => {
            typeField.field.onChange(event);
            addressField.field.onChange('');
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
                {type.icon}
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
        error={!!addressField.fieldState.error}
        helperText={addressField.fieldState.error?.message}
        type={
          addressField.field.value === UserIdentifierType.Email
            ? 'email'
            : 'text'
        }
        inputMode={
          addressField.field.value === UserIdentifierType.Email
            ? 'email'
            : 'text'
        }
        sx={{ flexGrow: 1 }}
        disabled={disabled}
      />
    </Stack>
  );
}
