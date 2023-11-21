import { Controller, useFormContext } from 'react-hook-form';

import { FormControlLabel, Radio, RadioGroup } from '@mui/material';

import { PropertyField } from './type';

export default function BooleanProperty({ id }: PropertyField) {
  const { control } = useFormContext();
  return (
    <Controller
      name={`claims.${id}`}
      control={control}
      render={({ field: { onChange, value } }) => (
        <RadioGroup
          value={(value as boolean).toString()}
          onChange={(_e, v) => onChange(v === 'true')}
        >
          <FormControlLabel value="true" control={<Radio />} label="True" />
          <FormControlLabel value="false" control={<Radio />} label="False" />
        </RadioGroup>
      )}
    />
  );
}
