import ErrorMessage from '@/components/form/error-message/error-message';
import { Controller, useFormContext } from 'react-hook-form';

import { TextField } from '@mui/material';

import { PropertyField } from './type';
import { getStringHelperText } from './utils';

export default function TextProperty({
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
      render={({ field: { onChange, ...field }, fieldState: { error } }) => (
        <>
          <TextField
            multiline
            maxRows={4}
            fullWidth
            error={!!error}
            onChange={(_e) =>
              onChange(_e.target.value?.length ? _e.target.value : undefined)
            }
            helperText={helper}
            inputProps={{
              maxLength: property.maxLength,
              minLength: property.minLength,
              pattern: property.pattern,
            }}
            {...field}
          />
          {error && <ErrorMessage>{error.message}</ErrorMessage>}
        </>
      )}
    />
  );
}
