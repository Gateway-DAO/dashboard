import { PrivateDataAsset } from '@/services/protocol-v3/types';
import { CONTAINER_PX } from '@/theme/config/style-tokens';

import { FileDownload } from '@mui/icons-material';
import { Stack, Box, IconButton } from '@mui/material';

import ShareCopy from './share-copy/share-copy';
import PDATabs from './tabs/pda-tabs';

type Props = {
  pda: PrivateDataAsset;
  isProofPda?: boolean;
  isOwner: boolean;
};

export default function PDAMetaDataDetails({ pda, isOwner }: Props) {
  return (
    <Stack
      direction={{
        xs: 'column-reverse',
        lg: 'column',
      }}
      gap={2}
    >
      <Stack
        direction="row"
        alignSelf={{
          lg: 'flex-end',
        }}
        width={{
          xs: '100%',
          lg: 'auto',
        }}
        pr={{
          ...CONTAINER_PX,
          xs: 0,
          md: 0,
        }}
        gap={2}
      >
        {isOwner ? (
          <>
            {pda.url && (
              <IconButton
                href={pda.url}
                target="_blank"
                sx={{ backgroundColor: '#00000014' }}
              >
                <FileDownload />
              </IconButton>
            )}

            <ShareCopy pda={pda} />
          </>
        ) : (
          <Box sx={{ height: 40 }} />
        )}
      </Stack>
      <Box>
        <PDATabs pda={pda} isOwner={isOwner} />
      </Box>
    </Stack>
  );
}
