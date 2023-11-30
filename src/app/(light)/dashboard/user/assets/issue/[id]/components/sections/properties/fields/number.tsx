import ErrorMessage from '@/components/form/error-message/error-message';
import { Controller, useFormContext } from 'react-hook-form';

import { TextField } from '@mui/material';

import { PropertyField } from './type';
import { getNumberHelperText } from './utils';

export default function NumberProperty({ id, ...property }: PropertyField) {
  const { control } = useFormContext();
  const helper = getNumberHelperText(property);
  return (
    <Controller
      name={`claim.${id}`}
      control={control}
      render={({
        field: { onChange, value, ...field },
        fieldState: { error },
      }) => {
        return (
          <>
            <TextField
              fullWidth
              value={(value as number)?.toString()}
              onChange={(_e) => {
                const value = _e.target.value;
                onChange(value);
              }}
              error={!!error}
              helperText={helper}
              inputProps={{
                valueAsNumber: true,
              }}
              {...field}
            />
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
          </>
        );
      }}
    />
  );
}
