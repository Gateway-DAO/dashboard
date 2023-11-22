'use client';

import { issuePda } from '@/locale/en/pda';
import {
  CONTAINER_PX,
  NEGATIVE_CONTAINER_PX,
} from '@/theme/config/style-tokens';

import { Divider, Stack, Typography } from '@mui/material';

import DataModelsFeatured from './featured';
import DataModelsSearch from './search/search';

export default function IssuePdaContent() {
  return (
    <Stack sx={{ mx: NEGATIVE_CONTAINER_PX }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          mt: 4,
          px: CONTAINER_PX,
        }}
      >
        <Stack>
          <Typography variant="body1" color="text.secondary">
            {issuePda.title}
          </Typography>
          <Typography variant="h3" sx={{ mb: 1 }}>
            {issuePda.subtitle}
          </Typography>
        </Stack>
      </Stack>
      <DataModelsFeatured />
      <Divider sx={{ mx: NEGATIVE_CONTAINER_PX, px: CONTAINER_PX }} />
      <DataModelsSearch />
    </Stack>
  );
}
