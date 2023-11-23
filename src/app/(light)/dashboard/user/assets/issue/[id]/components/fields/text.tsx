import { Controller, useFormContext } from 'react-hook-form';

import { TextField } from '@mui/material';

import { PropertyField } from './type';

export default function TextProperty({ id, defaultValue }: PropertyField) {
  const { control } = useFormContext();
  return (
    <Controller
      name={`claim.${id}`}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <>
          <TextField
            multiline
            maxRows={4}
            fullWidth
            defaultValue={defaultValue}
            {...field}
          />
          {error && <p>{error.message}</p>}
        </>
      )}
    />
  );
}
