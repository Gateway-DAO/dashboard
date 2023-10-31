'use client';
import { ChangeEvent, EventHandler, useState } from 'react';

import { explorerDataModels } from '@/locale/en/datamodel';

import { Close } from '@mui/icons-material';
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Box,
  Stack,
  Divider,
  Slider,
  InputAdornment,
} from '@mui/material';

export default function AmountOfIssuancesField() {
  const [values, setValues] = useState<number[]>([0, 1000]);
  const [isOpen, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  const handleInputChange =
    (index: 0 | 1) => (event: ChangeEvent<HTMLInputElement>) => {
      const newValues = [...values];
      newValues[index] = Number(event.target.value);
      setValues(newValues);
    };

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    setValues(newValue as number[]);
  };

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
      <InputLabel id="amount-issuances-label" htmlFor="amount-issuances">
        {explorerDataModels.filters.amount_of_issuances}
      </InputLabel>
      <Select
        labelId="amount-issuances-label"
        id="amount-issuances"
        label="Tags"
        open={isOpen}
        onOpen={onOpen}
        MenuProps={{
          onClose,
          keepMounted: false,
        }}
      >
        <Box
          sx={{
            p: 2,
            pt: 3,
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
              value={values[0]}
              onChange={handleInputChange(0)}
            />
            <Divider orientation="horizontal" sx={{ width: 20 }} />
            <TextField
              label="Maximum"
              size="small"
              value={values[1]}
              onChange={handleInputChange(1)}
            />
          </Stack>
          <Slider
            getAriaLabel={() => 'Minimum distance'}
            value={values}
            valueLabelDisplay="auto"
            getAriaValueText={(t: number) => t.toString()}
            disableSwap
            sx={{ my: 3 }}
            onChange={handleSliderChange}
          />
          <Stack direction="row" alignItems="center" gap={1}>
            <Button variant="outlined" fullWidth startIcon={<Close />}>
              Clear
            </Button>
            <Button variant="contained" fullWidth>
              Apply
            </Button>
          </Stack>
        </Box>
      </Select>
    </FormControl>
  );
}
