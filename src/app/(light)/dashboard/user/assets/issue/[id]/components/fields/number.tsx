import { Controller, useFormContext } from 'react-hook-form';

import { TextField } from '@mui/material';

import { PropertyField } from './type';

export default function NumberProperty({ id, defaultValue }: PropertyField) {
  const { control } = useFormContext();
  return (
    <Controller
      name={`claim.${id}`}
      control={control}
      defaultValue={(defaultValue as boolean)?.toString()}
      render={({
        field: { onChange, value, ...field },
        fieldState: { error },
      }) => (
        <>
          <TextField
            type="number"
            fullWidth
            defaultValue={defaultValue}
            value={(value as number)?.toString()}
            onChange={(_e) => onChange(Number(_e.target.value))}
            {...field}
          />
          {error && <p>{error.message}</p>}
        </>
      )}
    />
  );
}
