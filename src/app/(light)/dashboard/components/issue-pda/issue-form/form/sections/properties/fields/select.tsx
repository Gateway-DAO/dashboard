import ErrorMessage from '@/components/form/error-message/error-message';
import { Controller, useFormContext } from 'react-hook-form';

import { FormHelperText, MenuItem, Select } from '@mui/material';

import { PropertyField } from './type';
import { getStringHelperText } from './utils';

export default function SelectProperty({
  id,
  hideHelperText,
  ...property
}: PropertyField) {
  const { control } = useFormContext();

  const helper = !hideHelperText ? getStringHelperText(property) : undefined;

  return (
    <Controller
      name={`claim.${id}`}
      control={control}
      render={({
        field: { onChange, value, ...field },
        fieldState: { error },
      }) => (
        <>
          <Select
            value={value}
            onChange={onChange}
            {...field}
            error={!!error}
            fullWidth
          >
            {property.enum?.map((item) => (
              <MenuItem value={item} key={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
          {helper && <FormHelperText>{helper}</FormHelperText>}
          {error && <ErrorMessage>{error.message}</ErrorMessage>}
        </>
      )}
    />
  );
}
