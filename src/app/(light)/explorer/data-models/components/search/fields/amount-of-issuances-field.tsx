'use client';

import RangeField from '@/components/form/range-field/range-field';
import { explorerDataModels } from '@/locale/en/datamodel';

type Props = {
  min?: number;
  max: number;
  selectedAmountOfIssuances: number[];
  setAmountOfIssuances: (amountOfIssuances: number[]) => void;
};

export default function AmountOfIssuancesField({
  min = 0,
  max,
  selectedAmountOfIssuances,
  setAmountOfIssuances,
}: Props) {
  const onClear = () => setAmountOfIssuances([]);

  return (
    <RangeField
      label={explorerDataModels.filters.amount_of_issuances}
      onClear={onClear}
      onApply={setAmountOfIssuances}
      value={selectedAmountOfIssuances}
      min={min}
      max={max}
    />
  );
}
