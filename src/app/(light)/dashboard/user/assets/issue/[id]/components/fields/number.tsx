import { useFormContext } from 'react-hook-form';

import { TextField } from '@mui/material';

import { PropertyField } from './type';

export default function NumberProperty({ id, defaultValue }: PropertyField) {
  const { register } = useFormContext();
  return (
    <TextField
      type="number"
      fullWidth
      defaultValue={defaultValue}
      {...register(`claim.${id}`)}
    />
  );
}
