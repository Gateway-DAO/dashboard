'use client';

import { Search } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';

type SerchFiltersProps = {
  onChange: (value: string) => void;
};

export default function SearchField({ onChange }: SerchFiltersProps) {
  return (
    <TextField
      id="search"
      hiddenLabel
      aria-label="Search"
      sx={{
        flex: 1,
      }}
      onChange={({ target: { value } }) => onChange(value.trim())}
      placeholder="Search"
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
