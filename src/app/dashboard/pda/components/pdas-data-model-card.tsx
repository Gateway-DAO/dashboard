'use client';
import { AvatarFile } from '@/components/avatar-file/avatar-file';
import ExternalLink from '@/components/external-link/external-link';

import { Stack, Divider, Typography } from '@mui/material';

import { protocol } from '../../../../../locale/en/protocol';

type Props = {
  dataModels: any; // TODO: Add type
};

export default function PdasDataModelCard({ dataModels }: Props) {
  return (
    <>
      <Typography fontWeight={600} sx={{ mb: 3 }}>
        {protocol.pda.shared_pdas}
      </Typography>
      {dataModels.map((dataModel: any) => (
        <Stack
          key={dataModel.id}
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            mb: 3,
            backgroundColor: 'common.white',
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ py: 3, px: 2 }}
          >
            <Typography fontWeight={600}>{dataModel?.title}</Typography>
            <ExternalLink
              text={protocol.pda.data_model_id}
              sxProps={{ alignSelf: 'flex-end' }}
              handleClick={() => console.log('test')} // TODO: Add a dynamic url
            />
          </Stack>
          <Stack divider={<Divider sx={{ width: '100%' }} />}>
            {dataModel.credentials.map((pda: any) => (
              <Stack
                key={pda?.id}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                gap={1}
                sx={{ p: 2 }}
              >
                <Typography sx={{ flexGrow: 1 }}>{pda?.title}</Typography>
                <Typography>{pda?.issuer?.name}</Typography>
                <AvatarFile
                  file={pda?.issuer?.avatar}
                  sx={{ width: 32, height: 32 }}
                />
              </Stack>
            ))}
          </Stack>
        </Stack>
      ))}
    </>
  );
}
