import {
  ColumnGrid,
  TableFilterSearch,
} from '@/components/table-filter-search/table-filter-search';

import { FilterListOutlined, SearchOutlined } from '@mui/icons-material';
import { IconButton, Stack, TextField } from '@mui/material';

import { TableSharedDataAssets } from './table-shared';

export default function DataAssetsSharedWithPage() {
  return (
    <Stack>
      <Stack
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}
      >
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search"
          label="Search"
          InputProps={{ endAdornment: <SearchOutlined /> }}
        />
        <IconButton sx={{ borderRadius: '48px', border: '1px solid' }}>
          <FilterListOutlined />
        </IconButton>
      </Stack>
      <TableSharedDataAssets />
    </Stack>
  );
}
