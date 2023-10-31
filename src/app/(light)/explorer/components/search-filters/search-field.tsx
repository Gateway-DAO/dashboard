'use client';
import { Search } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';

import { SerchFiltersProps } from './types';

export default function SearchField({
  onSearch,
  isSearching,
}: SerchFiltersProps) {
  return (
    <TextField
      label="Search"
      sx={{
        flex: 1,
      }}
      onChange={({ target: { value } }) => onSearch(value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
    />
  );
}
