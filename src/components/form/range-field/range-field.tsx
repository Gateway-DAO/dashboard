'use client';
import { useState } from 'react';

import { FormControl, InputLabel, Select } from '@mui/material';

import RangeFieldDropdown, {
  RangeFieldDropdownProps,
} from './range-field-dropdown';

export type RangeFieldProps = {
  label: string;
  value: number[];
  isLoading?: boolean;
} & Omit<RangeFieldDropdownProps, 'onClose' | 'currentValue'>;

export default function RangeField({
  isLoading,
  label,
  value,
  min,
  max,
  step,
  InputProps,
  onApply,
  onClear,
}: RangeFieldProps) {
  const [isOpen, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  console.log('field', value);

  return (
    <FormControl
      fullWidth
      sx={{
        maxWidth: {
          xs: 'unset',
          lg: 200,
        },
      }}
    >
      <InputLabel id="consumption-price-label" htmlFor="consumption-price">
        {label}
      </InputLabel>
      <Select
        labelId="consumption-price-label"
        id="consumption-price"
        label="Tags"
        open={isOpen}
        onOpen={onOpen}
        MenuProps={{
          onClose,
          keepMounted: false,
        }}
        value={value}
        renderValue={() => value.join(' - ')}
        disabled={isLoading}
      >
        {!isLoading && (
          <RangeFieldDropdown
            currentValue={value}
            min={min}
            max={max}
            step={step}
            InputProps={InputProps}
            onApply={onApply}
            onClear={onClear}
            onClose={onClose}
          ></RangeFieldDropdown>
        )}
      </Select>
    </FormControl>
  );
}
