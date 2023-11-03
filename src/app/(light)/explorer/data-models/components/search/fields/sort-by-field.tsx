'use client';
import { PropsWithChildren, useCallback } from 'react';

import { explorerDataModels } from '@/locale/en/datamodel';
import { DataModel } from '@/services/protocol/types';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

export type DataModelSortOption = {
  key: string;
  label: string;
  value?: Partial<Record<keyof DataModel, 'ASC' | 'DESC'>>;
};

export const dataModelSortOptions: DataModelSortOption[] = [
  {
    key: 'newest',
    label: 'Newest',
    value: undefined,
  },
  { key: 'oldest', label: 'Oldest', value: { createdAt: 'ASC' } },
  {
    key: 'price-high-to-low',
    label: 'Price high to low',
    value: { consumptionPrice: 'DESC' },
  },
  {
    key: 'price-low-to-high',
    label: 'Price low to high',
    value: { consumptionPrice: 'ASC' },
  },
  {
    key: 'issuances-high-to-low',
    label: 'Issuances high to low',
    value: { pdasIssuedCount: 'DESC' },
  },
  {
    key: 'issuances-low-to-high',
    label: 'Issuances low to high',
    value: { pdasIssuedCount: 'ASC' },
  },
];

const defaultOption = dataModelSortOptions[0];

type Props = {
  selectedSort?: DataModelSortOption;
  onSort: (value?: DataModelSortOption) => void;
};

export default function SortByField({ selectedSort, onSort }: Props) {
  const handleChange = useCallback((event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;

    onSort(dataModelSortOptions.find((option) => option.key === value));
  }, []);

  return (
    <FormControl
      fullWidth
      sx={{
        maxWidth: {
          xs: 'unset',
          lg: 200,
        },
        marginLeft: {
          xs: 'unset',
          lg: 'auto',
        },
      }}
    >
      <InputLabel id="sorting-label">
        {explorerDataModels.filters.sort_by}
      </InputLabel>
      <Select
        labelId="sorting-label"
        id="sorting"
        label="Tags"
        onChange={handleChange}
        value={selectedSort?.key ?? defaultOption.key}
        renderValue={() => selectedSort?.label ?? defaultOption.label}
      >
        {dataModelSortOptions.map(({ key, label }) => (
          <MenuItem key={key} value={key}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
