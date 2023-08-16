import { AvatarFile } from '@/components/avatar-file/avatar-file';
import ExternalLink from '@/components/external-link/external-link';
import { theme } from '@/theme';
import { limitCharsCentered } from '@/utils/string';

import { Stack, Divider, Typography, alpha } from '@mui/material';

import { protocol } from '../../../../../locale/en/protocol';

type Props = {
  pda: any; // TODO: Add type
};

export default function PdaCardTitle({ pda }: Props) {
  return (
    <Stack
      sx={{
        borderRadius: 1,
        mb: 3,
        p: 2,
        backgroundColor: alpha(theme.palette.secondary.main, 0.4),
      }}
      divider={<Divider sx={{ width: '100%' }} />}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Stack gap={1}>
          <Typography variant="caption" color="text.secondary">
            {protocol.pda.data_shared_with}
          </Typography>
          <Stack direction="row" alignItems="center" gap={1.5}>
            <AvatarFile
              file={null}
              fallback="https://1000logos.net/wp-content/uploads/2016/11/Shape-of-the-Chase-logo-500x311.jpg"
              sx={{ width: 56, height: 56 }}
            />
            <Typography variant="h3">{pda?.title}</Typography>
          </Stack>
        </Stack>
        <ExternalLink
          text={`ID ${limitCharsCentered(pda?.id, 8)}`}
          sxProps={{ alignSelf: 'flex-start' }}
          onClick={() => console.log('test')}
        />
      </Stack>
    </Stack>
  );
}
