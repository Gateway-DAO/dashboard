'use client';

import RangeField from '@/components/form/range-field/range-field';
import { explorerDataModels } from '@/locale/en/datamodel';

import { InputAdornment } from '@mui/material';

type Props = {
  min?: number;
  max: number;
  selectedConsumptionPrice: number[];
  setConsumptionPrice: (consumptionPrice: number[]) => void;
};

export default function ConsumpitonPriceField({
  min = 0,
  max,
  selectedConsumptionPrice,
  setConsumptionPrice,
}: Props) {
  const onClear = () => setConsumptionPrice([]);

  return (
    <RangeField
      label={explorerDataModels.filters.comsumption_price}
      InputProps={{
        startAdornment: <InputAdornment position="start">$</InputAdornment>,
      }}
      onClear={onClear}
      onApply={setConsumptionPrice}
      value={selectedConsumptionPrice}
      step={0.01}
      min={min}
      max={max}
    />
  );
}
