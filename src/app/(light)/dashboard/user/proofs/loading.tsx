import { Skeleton, Stack } from '@mui/material';

import { TableSharedDataProofsContainer } from './components/table-shared-container';

export default function DataAssetsLoadingPage() {
  return (
    <TableSharedDataProofsContainer>
      <Stack direction="column" sx={{ width: '100%' }}>
        <Skeleton height={50} />
        <Skeleton height={50} />
        <Skeleton height={50} />
        <Skeleton height={50} />
      </Stack>
    </TableSharedDataProofsContainer>
  );
}
