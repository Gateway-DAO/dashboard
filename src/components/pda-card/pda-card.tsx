import Link from 'next/link';

import { protocol } from '@/locale/en/protocol';

import { Card, CardActionArea, Chip, Stack, Typography } from '@mui/material';

import { AvatarFile } from '../avatar-file/avatar-file';

type Props = {
  dashed?: boolean;
  pda: any; // TODO: Add type
};

export default function PdaCard({ pda, dashed }: Props) {
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
        // flexBasis: 'calc(50% - 4px)',
        // maxWidth: 320,
      }}
    >
      <CardActionArea component={Link} href={`/proof/`} sx={{
        p: 2,
      }}>
        <Stack alignItems="flex-start">
          <Stack direction="row" alignItems="center" gap={1.5} sx={{ mb: 3 }}>
            <AvatarFile
              file={pda?.issuer?.avatar}
              sx={{ width: 32, height: 32 }}
              fallback={pda?.issuer?.avatar}
            />
            <Typography variant="body2" sx={{ flexGrow: 1 }}>
              {pda?.issuer?.chain}
            </Typography>
          </Stack>
          <Typography fontWeight={700} sx={{ mb: 2 }}>
            {pda?.title}
          </Typography>
          <Chip label={protocol.pda.valid} variant="outlined" color="success" />
        </Stack>
      </CardActionArea>
    </Stack>
  );
}
