import { Controller, useFormContext } from 'react-hook-form';

import { FormControlLabel, Radio, RadioGroup } from '@mui/material';

import { PropertyField } from './type';

export default function BooleanProperty({ id, defaultValue }: PropertyField) {
  const { control } = useFormContext();
  return (
    <Controller
      name={`claim.${id}`}
      control={control}
      defaultValue={(defaultValue as boolean)?.toString()}
      render={({ field: { onChange, value } }) => (
        <RadioGroup
          value={(value as boolean)?.toString()}
          onChange={(_e, v) => onChange(v === 'true')}
        >
          <FormControlLabel value="true" control={<Radio />} label="True" />
          <FormControlLabel value="false" control={<Radio />} label="False" />
        </RadioGroup>
      )}
    />
  );
}
