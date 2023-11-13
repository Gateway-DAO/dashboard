import { ChangeEvent, useState } from 'react';

import { Close } from '@mui/icons-material';
import {
  Button,
  TextField,
  Box,
  Stack,
  Divider,
  Slider,
  TextFieldProps,
} from '@mui/material';

export type RangeFieldDropdownProps = {
  currentValue: number[];
  min: number;
  max: number;
  step?: number;
  InputProps?: TextFieldProps['InputProps'];
  onClear: () => void;
  onApply: (values: number[]) => void;
  onClose: () => void;
};

export default function RangeFieldDropdown({
  currentValue,
  min,
  max,
  step,
  InputProps,
  onClose,
  onApply: onApplyCb,
  onClear: onClearCb,
}: RangeFieldDropdownProps) {
  const [values, setValues] = useState<number[]>(
    currentValue.length ? currentValue : [min, max]
  );

  const handleInputChange =
    (index: 0 | 1) => (event: ChangeEvent<HTMLInputElement>) => {
      const newValues = [...values];
      newValues[index] = Number(event.target.value);
      setValues(newValues);
    };

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    setValues(newValue as number[]);
  };

  const onApply = () => {
    onApplyCb(values);
    onClose();
  };

  const onClear = () => {
    onClearCb();
    setValues([min, max]);
    onClose();
  };

  return (
    <Box
      sx={{
        p: 2,
        pt: 3,
        maxWidth: {
          xs: 'unset',
          lg: 320,
        },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        gap={1}
      >
        <TextField
          label="Minimum"
          size="small"
          InputProps={InputProps}
          value={values[0]}
          onChange={handleInputChange(0)}
        />
        <Divider
          orientation="horizontal"
          sx={{
            width: 20,
          }}
        />
        <TextField
          label="Maximum"
          size="small"
          InputProps={InputProps}
          value={values[1]}
          onChange={handleInputChange(1)}
        />
      </Stack>
      <Slider
        getAriaLabel={() => 'Minimum distance'}
        value={values}
        valueLabelDisplay="auto"
        min={min}
        max={max}
        step={step}
        getAriaValueText={(t: number) => t.toString()}
        disableSwap
        sx={{
          my: 3,
        }}
        onChange={handleSliderChange}
      />
      <Stack direction="row" alignItems="center" gap={1}>
        <Button
          variant="outlined"
          fullWidth
          startIcon={<Close />}
          onClick={onClear}
        >
          Clear
        </Button>
        <Button variant="contained" fullWidth onClick={onApply}>
          Apply
        </Button>
      </Stack>
    </Box>
  );
}
