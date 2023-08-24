'use client';
import { useState } from 'react';

import { FilterListOutlined, SearchOutlined } from '@mui/icons-material';
import { IconButton, Stack, TextField } from '@mui/material';

import { TableSharedDataAssets } from './table-shared';

export default function DataAssetsSharedWithPage() {
  const [tableView, setTableView] = useState(true);

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
        <IconButton
          sx={{ borderRadius: '48px', border: '1px solid' }}
          onClick={() => setTableView((prev) => !prev)}
        >
          <FilterListOutlined />
        </IconButton>
      </Stack>
      {tableView ? <TableSharedDataAssets /> : <p>nada ainda</p>}
    </Stack>
  );
}
