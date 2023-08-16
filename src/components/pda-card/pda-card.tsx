import { protocol } from '@/locale/en/protocol';

import { Chip, Stack, Typography } from '@mui/material';

import { AvatarFile } from '../avatar-file/avatar-file';

type Props = {
  pda: any; // TODO: Add type
};

export default function PdaCard({ pda }: Props) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      gap={1}
      sx={{
        border: '1px dashed',
        borderColor: 'divider',
        borderRadius: 1,
        flexBasis: 'calc(50% - 4px)',
        p: 2,
        backgroundColor: 'common.white',
        maxWidth: 320,
      }}
    >
      <Stack alignItems="flex-start">
        <Stack direction="row" alignItems="center" gap={1.5} sx={{ mb: 3 }}>
          <AvatarFile
            file={pda?.issuer?.avatar}
            sx={{ width: 32, height: 32 }}
            fallback={pda?.issuer?.avatar}
          />
          <Typography variant="body2" sx={{ flexGrow: 1 }}>
            {pda?.issuer?.name}
          </Typography>
        </Stack>
        <Typography fontWeight={700} sx={{ mb: 2 }}>
          {pda?.title}
        </Typography>
        <Chip label={protocol.pda.valid} variant="outlined" color="success" />
      </Stack>
    </Stack>
  );
}
