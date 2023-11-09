'use client';

import RangeField, {
  RangeFieldProps,
} from '@/components/form/range-field/range-field';
import { explorerDataModelRequestTemplates } from '@/locale/en/datamodel';

import { InputAdornment } from '@mui/material';

type Props = {
  selectedAverageCost: number[];
  setAverageCost: (averageCost: number[]) => void;
} & Pick<RangeFieldProps, 'min' | 'max' | 'isLoading'>;

export default function AverageCostField({
  min = 0,
  max,
  isLoading,
  selectedAverageCost,
  setAverageCost,
}: Props) {
  const onClear = () => setAverageCost([]);

  return (
    <RangeField
      label={explorerDataModelRequestTemplates.filters.average_cost}
      InputProps={{
        startAdornment: <InputAdornment position="start">$</InputAdornment>,
      }}
      onClear={onClear}
      onApply={setAverageCost}
      value={selectedAverageCost}
      step={0.01}
      min={min}
      max={max}
      isLoading={isLoading}
    />
  );
}
