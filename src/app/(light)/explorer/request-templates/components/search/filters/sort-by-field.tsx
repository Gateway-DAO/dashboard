'use client';
import { PropsWithChildren, useCallback } from 'react';

import { explorerDataModelRequestTemplates } from '@/locale/en/datamodel';
import { DataRequestTemplate } from '@/services/protocol/types';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

export type DataRequestTemplateSortOption = {
  key: string;
  label: string;
  value?: Partial<Record<keyof DataRequestTemplate, 'ASC' | 'DESC'>>;
};

export const dataRequestTemplateSortOptions: DataRequestTemplateSortOption[] = [
  {
    key: 'newest',
    label: 'Newest',
    value: undefined,
  },
  { key: 'oldest', label: 'Oldest', value: { createdAt: 'ASC' } },
  {
    key: 'requests-high-to-low',
    label: 'Requests high to low',
    value: { dataRequestsCount: 'DESC' },
  },
  {
    key: 'requests-low-to-high',
    label: 'Requests low to high',
    value: { dataRequestsCount: 'ASC' },
  },
];

const defaultOption = dataRequestTemplateSortOptions[0];

type Props = {
  selectedSort?: DataRequestTemplateSortOption;
  onSort: (value?: DataRequestTemplateSortOption) => void;
};

export default function SortByField({ selectedSort, onSort }: Props) {
  const handleChange = useCallback((event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;

    onSort(
      dataRequestTemplateSortOptions.find((option) => option.key === value)
    );
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
        {explorerDataModelRequestTemplates.filters.sort_by}
      </InputLabel>
      <Select
        labelId="sorting-label"
        id="sorting"
        label="Tags"
        onChange={handleChange}
        value={selectedSort?.key ?? defaultOption.key}
        renderValue={() => selectedSort?.label ?? defaultOption.label}
      >
        {dataRequestTemplateSortOptions.map(({ key, label }) => (
          <MenuItem key={key} value={key}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
