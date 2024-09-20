import CopyData from '@/app/dashboard/components/copy/copy';
import CardCell from '@/components/card-cell/card-cell';
import { PublicDataAsset } from '@/services/api/models';
import { formatBytes } from '@/utils/bytes';
import { formatDate, formatDateDifference } from '@/utils/date';

import { Stack, Divider, Card, Typography, Chip } from '@mui/material';

import Tags, { Tag } from './components/tags';

type Props = {
  pda: PublicDataAsset;
};

export default function MetaDataDetails({ pda }: Props) {
  return (
    <Stack>
      <Stack
        component={Card}
        variant="outlined"
        sx={{
          width: '100%',
        }}
      >
        <Stack divider={<Divider />}>
          <Stack
            direction={{
              xs: 'column',
              lg: 'row',
            }}
            justifyContent="space-between"
          >
            <CardCell label="Last Modified" margin={false} py={3}>
              <span>{formatDate(pda.updated_at)}</span>
            </CardCell>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ display: { xs: 'none', lg: 'block' } }}
            />
            <Divider
              orientation="horizontal"
              flexItem
              sx={{ display: { lg: 'none' } }}
            />
            <CardCell label="Expiration" margin={false} py={3}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="baseline"
              >
                <span>{formatDateDifference(pda.expiration_date)}</span>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ ml: 1 }}
                >
                  {formatDate(pda.expiration_date)}
                </Typography>
              </Stack>
            </CardCell>
          </Stack>
          <CardCell label="Created At" margin={false} py={3}>
            <span>{formatDate(pda.created_at)}</span>
          </CardCell>
        </Stack>
      </Stack>
      <Stack
        component={Card}
        variant="outlined"
        sx={{
          width: '100%',
          mt: 1,
        }}
      >
        <Stack divider={<Divider />}>
          <Stack direction="row" justifyContent="space-between">
            <CardCell label="Size" margin={false} py={3}>
              <span>{formatBytes(pda.size ?? 0)}</span>
            </CardCell>
            <Divider orientation="vertical" flexItem />
            <CardCell label="Type" margin={false} py={3}>
              <span>{pda.type}</span>
            </CardCell>
          </Stack>
          {(pda.tags?.length || pda.data_model_id) && (
            <Stack
              direction={{
                xs: 'column',
                lg: 'row',
              }}
              justifyContent="space-between"
            >
              {pda.tags?.length && (
                <>
                  <CardCell
                    display={{
                      lg: 'none',
                    }}
                    label="Tags"
                    margin={false}
                    py={3}
                    contentProps={{
                      display: 'flex',
                      sx: {
                        gap: 1,
                        mt: 1,
                      },
                    }}
                  >
                    {pda.tags.map((tag) => (
                      <Tag tag={tag} key={tag} />
                    ))}
                  </CardCell>
                  <CardCell
                    display={{
                      xs: 'none',
                      lg: 'block',
                    }}
                    label="Tags"
                    margin={false}
                    py={3}
                    contentProps={{
                      sx: {
                        mt: 1,
                      },
                    }}
                  >
                    <Tags tags={pda.tags} />
                  </CardCell>
                </>
              )}
              {pda.tags?.length && pda.data_model_id && (
                <>
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ display: { xs: 'none', lg: 'block' } }}
                  />
                  <Divider
                    orientation="horizontal"
                    flexItem
                    sx={{ display: { lg: 'none' } }}
                  />
                </>
              )}
              {pda.data_model_id && (
                <CardCell label="Data model ID" margin={false} py={3}>
                  <CopyData text={pda.data_model_id?.toString() || ''} />
                </CardCell>
              )}
            </Stack>
          )}
          <CardCell label="Data asset ID" margin={false} py={3}>
            <CopyData text={pda.fid ?? ''} />
          </CardCell>
        </Stack>
      </Stack>
    </Stack>
  );
}
