import Link from 'next/link';

import { Card, CardActionArea, Stack, Typography } from '@mui/material';

import { AvatarFile } from '../avatar-file/avatar-file';
import { PDAStatusChip } from './pda-status-chip';
import { PdaCardProps } from './type';

export default function PdaCard({ name, issuerImage, issuerName, dashed, href, status }: PdaCardProps) {
  return (
    <Stack
      component={Card}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      variant="outlined"
      gap={1}
      sx={{
        ...(dashed && { borderStyle: 'dashed' }),
        width: '100%',
      }}
    >
      <CardActionArea
        component={Link}
        href={href}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          px: 2,
          pt: 2,
          pb: 3,
          height: '100%',
          gap: 2
        }}
        title={name}
      >
        <Stack alignItems="flex-start" >
          <Stack direction="row" alignItems="center" gap={1.5} sx={{ mb: 3 }}>
            <AvatarFile
              file={issuerImage}
              sx={{ width: 32, height: 32 }}
            />
            <Typography variant="body2" sx={{ flexGrow: 1 }} noWrap>
              {issuerName}
            </Typography>
          </Stack>
          <Typography fontWeight={700}>
            {name}
          </Typography>
        </Stack>
        <PDAStatusChip variant="outlined" status={status} size="small" />
      </CardActionArea>
    </Stack>
  );
}
