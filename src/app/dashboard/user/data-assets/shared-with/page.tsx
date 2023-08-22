import {
  ColumnGrid,
  TableFilterSearch,
} from '@/components/table-filter-search/table-filter-search';

import { Stack } from '@mui/material';

export default function DataAssetsSharedWithPage() {
  const columns: ColumnGrid[] = [
    {
      header_name: 'Verifier',
    },
    {
      header_name: 'Share date',
    },
    {
      header_name: 'Data amount',
    },
  ];

  const data = {
    pages: [{}],
  };

  return (
    <Stack>
      <Stack>top</Stack>
      {/* <TableFilterSearch columns={columns} data={data} /> */}
    </Stack>
  );
}
