'use client';

import RangeField, {
  RangeFieldProps,
} from '@/components/form/range-field/range-field';
import { explorerDataModelRequestTemplates } from '@/locale/en/datamodel';

type Props = {
  selectedAmountOfDataRequests: number[];
  setAmountOfDataRequests: (amountOfDataRequests: number[]) => void;
} & Pick<RangeFieldProps, 'min' | 'max' | 'isLoading'>;

export default function AmountOfDataRequestsField({
  min = 0,
  max,
  isLoading,
  selectedAmountOfDataRequests,
  setAmountOfDataRequests,
}: Props) {
  const onClear = () => setAmountOfDataRequests([]);

  return (
    <RangeField
      label={explorerDataModelRequestTemplates.filters.average_cost}
      onClear={onClear}
      onApply={setAmountOfDataRequests}
      value={selectedAmountOfDataRequests}
      min={min}
      max={max}
      isLoading={isLoading}
    />
  );
}
