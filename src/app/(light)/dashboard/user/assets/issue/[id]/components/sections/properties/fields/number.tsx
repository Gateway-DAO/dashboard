import ErrorMessage from '@/components/form/error-message/error-message';
import { Controller, useFormContext } from 'react-hook-form';

import { TextField } from '@mui/material';

import { PropertyField } from './type';
import { getNumberHelperText } from './utils';

export default function NumberProperty({
  id,
  hideHelperText,
  ...property
}: PropertyField) {
  const { control } = useFormContext();
  const helper = !hideHelperText ? getNumberHelperText(property) : undefined;

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
              value={
                typeof value === 'object'
                  ? value.value?.toString()
                  : (value as number)?.toString()
              }
              onChange={(_e) => {
                const value = _e.target.value;
                onChange(Number(value));
              }}
              error={!!error}
              helperText={helper}
              inputProps={{
                valueAsNumber: true, // TODO: Warning: React does not recognize the `valueAsNumber` prop on a DOM element.
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
