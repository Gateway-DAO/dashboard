'use client';
import { useRouter } from 'next/navigation';

import { proof as proofLocale } from '@/locale/en/proof';
import {
  CONTAINER_PX,
  NEGATIVE_CONTAINER_PX,
  WIDTH_CENTERED,
} from '@/theme/config/style-tokens';

import { Stack, Divider, Typography, Card } from '@mui/material';

import ProofPdaListItem from './proof-pda-list-item';

type Props = {
  dataModels: any; // TODO: Add type
};

export default function ProofData({ dataModels }: Props) {
  const router = useRouter();
  return (
    <Stack sx={{ my: 2 }}>
      <Stack sx={{ ...WIDTH_CENTERED }}>
        <Typography fontWeight={400} fontSize={24} sx={{ mb: 3 }}>
          {proofLocale.share.data_asset_shared}
        </Typography>
      </Stack>
      <Stack
        divider={
          <Divider
            sx={{
              mb: 3,
              mx: NEGATIVE_CONTAINER_PX,
              px: CONTAINER_PX,
            }}
          />
        }
      >
        {dataModels.map((dataModel: any) => (
          <Stack key={dataModel.id}>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ ...WIDTH_CENTERED, mb: 2 }}
            >
              <Typography fontWeight={600} color="text.secondary">
                {dataModel?.title}
              </Typography>
              {/* <ExternalLink text={datamodel.data_model_id} href="#" /> */}
            </Stack>
            <Stack
              component={Card}
              variant="outlined"
              direction="row"
              flexWrap="wrap"
              mb={3}
              sx={{
                ...WIDTH_CENTERED,
                overflow: 'hidden',
              }}
              divider={<Divider sx={{ width: '100%' }} />}
            >
              {dataModel.credentials.map((pda: any) => (
                <ProofPdaListItem
                  key={pda.id}
                  onClick={() =>
                    router.push(`?pda-id=${pda.id}`, { scroll: false })
                  }
                  {...pda}
                />
              ))}
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
