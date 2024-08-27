'use client';
import { useCallback } from 'react';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

export type SortByOption<T = any> = {
  key: string;
  label: string;
  value?: Partial<Record<keyof T, 'ASC' | 'DESC'>>;
};

type Props<T = any> = {
  options: SortByOption<T>[];
  selectedSort?: SortByOption<T>;
  onSort: (value?: SortByOption<T>) => void;
};

export default function SortByField({ selectedSort, options, onSort }: Props) {
  const defaultOption = options[0];
  const handleChange = useCallback((event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;

    onSort(options.find((option) => option.key === value));
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
      <InputLabel id="sorting-label">{'Sort by'}</InputLabel>
      <Select
        labelId="sorting-label"
        id="sorting"
        label="Tags"
        onChange={handleChange}
        value={selectedSort?.key ?? defaultOption?.key}
        renderValue={() => selectedSort?.label ?? defaultOption?.label}
      >
        {options.map(({ key, label }) => (
          <MenuItem key={key} value={key}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
