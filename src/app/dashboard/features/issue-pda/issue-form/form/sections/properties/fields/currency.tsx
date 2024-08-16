import ErrorMessage from '@/components/form/error-message/error-message';
import { Controller, useFormContext } from 'react-hook-form';

import { InputAdornment, TextField } from '@mui/material';

import { PropertyField } from './type';

export default function CurrencyProperty({ id, metadata }: PropertyField) {
  const { control } = useFormContext();
  return (
    <Controller
      name={`claim.${id}`}
      control={control}
      render={({ field: { onChange, ...field }, fieldState: { error } }) => {
        return (
          <>
            <TextField
              fullWidth
              error={!!error}
              onChange={(_e) =>
                onChange(_e.target.value?.length ? _e.target.value : undefined)
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {metadata?.currency ?? '$'}
                  </InputAdornment>
                ),
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
