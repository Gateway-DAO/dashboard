'use client';

import RangeField, {
  RangeFieldProps,
} from '@/components/form/range-field/range-field';

import { InputAdornment } from '@mui/material';

type Props = {
  selectedConsumptionPrice: number[];
  setConsumptionPrice: (consumptionPrice: number[]) => void;
} & Pick<RangeFieldProps, 'min' | 'max' | 'isLoading'>;

export default function ConsumpitonPriceField({
  min = 0,
  max,
  isLoading,
  selectedConsumptionPrice,
  setConsumptionPrice,
}: Props) {
  const onClear = () => setConsumptionPrice([]);

  return (
    <RangeField
      label={'Consumption price'}
      InputProps={{
        startAdornment: <InputAdornment position="start">$</InputAdornment>,
      }}
      onClear={onClear}
      onApply={setConsumptionPrice}
      value={selectedConsumptionPrice}
      step={0.01}
      min={min}
      max={max}
      isLoading={isLoading}
    />
  );
}
