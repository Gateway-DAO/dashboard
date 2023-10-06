import { common } from '@/locale/en/common';
import { IdentifierValueSchema } from '@/schemas/identifier-value';
import { IdentifierType } from '@/services/protocol/types';
import { Control, useController } from 'react-hook-form';

import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { useIdentifierTypes } from './use-identifier-types';

type Props = {
  control: Control<IdentifierValueSchema>;
  clearErrors?: () => void;
};

export default function UserIdentityField({ control, clearErrors }: Props) {
  const identifierTypes = useIdentifierTypes();

  const typeField = useController({
    control,
    name: 'type',
    defaultValue: IdentifierType.GatewayId,
  });

  const addressField = useController({
    control,
    name: 'address',
    defaultValue: '',
  });

  return (
    <Stack gap={1} sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
      <FormControl sx={{ width: { xs: '100%', md: 220 } }}>
        <InputLabel htmlFor="type">{common.identifier.type}</InputLabel>
        <Select
          label={common.identifier.type}
          error={!!typeField.fieldState.error}
          id="field-identifier-type"
          sx={{ mb: { xs: 1, md: 0 } }}
          inputProps={{ defaultValue: IdentifierType.GatewayId }}
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
        sx={{ flexGrow: 1 }}
      />
    </Stack>
  );
}
