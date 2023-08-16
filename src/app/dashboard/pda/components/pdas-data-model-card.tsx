'use client';
import { AvatarFile } from '@/components/avatar-file/avatar-file';
import ExternalLink from '@/components/external-link/external-link';

import { Stack, Divider, Typography, Chip } from '@mui/material';

import { protocol } from '../../../../../locale/en/protocol';

type Props = {
  dataModels: any; // TODO: Add type
};

export default function PdasDataModelCard({ dataModels }: Props) {
  return (
    <>
      <Typography fontWeight={400} fontSize={24} sx={{ mb: 3 }}>
        {protocol.pda.data_asset_shared}
      </Typography>
      <Stack divider={<Divider sx={{ mb: 3 }} />}>
        {dataModels.map((dataModel: any) => (
          <Stack key={dataModel.id}>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ mb: 2 }}
            >
              <Typography fontWeight={600} color="text.secondary">
                {dataModel?.title}
              </Typography>
              <ExternalLink
                text={protocol.pda.data_model_id}
                sxProps={{ alignSelf: 'flex-end' }}
                onClick={() => console.log('test')} // TODO: Add a dynamic url
              />
            </Stack>
            <Stack direction="row" flexWrap="wrap" gap={1} mb={3}>
              {dataModel.credentials.map((pda: any) => (
                <Stack
                  key={pda?.id}
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
                  }}
                >
                  <Stack alignItems="flex-start">
                    <Stack
                      direction="row"
                      alignItems="center"
                      gap={1.5}
                      sx={{ mb: 3 }}
                    >
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
                    <Chip
                      label={protocol.pda.valid}
                      variant="outlined"
                      color="success"
                    />
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </Stack>
        ))}
      </Stack>
    </>
  );
}
