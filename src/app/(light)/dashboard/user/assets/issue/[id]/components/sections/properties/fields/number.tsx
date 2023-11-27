import ErrorMessage from '@/components/form/error-message/error-message';
import { Controller, useFormContext } from 'react-hook-form';

import { TextField } from '@mui/material';

import { PropertyField } from './type';

export default function NumberProperty({ id, defaultValue }: PropertyField) {
  const { control } = useFormContext();
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
                value.length ? onChange(Number(value)) : onChange('');
              }}
              error={!!error}
              {...field}
            />
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
          </>
        );
      }}
    />
  );
}
