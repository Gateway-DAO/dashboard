'use client';

import RangeField, {
  RangeFieldProps,
} from '@/components/form/range-field/range-field';

type Props = {
  selectedAmountOfIssuances: number[];
  setAmountOfIssuances: (amountOfIssuances: number[]) => void;
} & Pick<RangeFieldProps, 'min' | 'max' | 'isLoading'>;

export default function AmountOfIssuancesField({
  min = 0,
  max,
  isLoading,
  selectedAmountOfIssuances,
  setAmountOfIssuances,
}: Props) {
  const onClear = () => setAmountOfIssuances([]);

  return (
    <RangeField
      label={'Amount of issuances'}
      onClear={onClear}
      onApply={setAmountOfIssuances}
      value={selectedAmountOfIssuances}
      min={min}
      max={max}
      isLoading={isLoading}
    />
  );
}
