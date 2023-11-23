import { useFormContext } from 'react-hook-form';

import { TextField } from '@mui/material';

import { PropertyField } from './type';

export default function TextProperty({ id, defaultValue }: PropertyField) {
  const { register } = useFormContext();

  return (
    <TextField
      multiline
      maxRows={4}
      fullWidth
      defaultValue={defaultValue}
      {...register(`claim.${id}`)}
    />
  );
}
