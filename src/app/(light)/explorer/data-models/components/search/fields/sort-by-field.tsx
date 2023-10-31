'use client';
import { explorerDataModels } from '@/locale/en/datamodel';

import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function SortByField() {
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
      <Select labelId="sorting-label" id="sorting" label="Tags">
        <MenuItem value={10}>Newest</MenuItem>
        <MenuItem value={20}>Oldest</MenuItem>
      </Select>
    </FormControl>
  );
}
