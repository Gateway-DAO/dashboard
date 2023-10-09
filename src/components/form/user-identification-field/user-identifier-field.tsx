import { common } from '@/locale/en/common';
import { IdentifierValueSchema } from '@/schemas/identifier-value';
import { IdentifierType, UserIdentifierType } from '@/services/protocol/types';
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
  control: Control<IdentifierValueSchema>;
  clearErrors?: () => void;
  sx: SxProps;
};

export default function UserIdentityField({ control, clearErrors, sx }: Props) {
  const identifierTypes = useIdentifierTypes();

  const typeField = useController({
    control,
    name: 'type',
    defaultValue: UserIdentifierType.GatewayId,
  });

  const addressField = useController({
    control,
    name: 'value',
    defaultValue: '',
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
      />
    </Stack>
  );
}
