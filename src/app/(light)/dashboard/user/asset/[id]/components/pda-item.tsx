'use client';

import Image from 'next/image';

import Activities from '@/components/activities/activities';
import Tags from '@/components/tags/tags';
import { pda as pdaLocale } from '@/locale/en/pda';
import { PdaQuery, PrivateDataAsset } from '@/services/protocol/types';
import {
  CONTAINER_PX,
  NEGATIVE_CONTAINER_PX,
  WIDTH_CENTERED,
} from '@/theme/config/style-tokens';
import { limitCharsCentered } from '@/utils/string';
import { useToggle } from '@react-hookz/web';
import { PartialDeep } from 'type-fest';

import { Divider, IconButton, Stack, Typography } from '@mui/material';

import DataTable from './data-table';
import ModalImage from './modal-image';
import PdaCardInfo from './pda-card-info';
import SendPda from './send-pda/send-pda';
import SharedWithCard from './shared-with-card';

type Props = {
  pda: PartialDeep<PrivateDataAsset>;
  viewOnly?: boolean;
};

export default function PDAItem({ pda, viewOnly = false }: Props) {
  const [showImagePDAModal, toggleShowImagePDAModal] = useToggle(false);
  function transformObjectToArray(obj: any) {
    const resultArray = [];

    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        resultArray.push({ name: prop, value: obj[prop] });
      }
    }

    return resultArray;
  }

  const claimArray = transformObjectToArray(pda.dataAsset?.claim);
  return (
    <>
      <Stack sx={{ ...WIDTH_CENTERED, my: 2 }}>
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          {`ID ${limitCharsCentered(pda?.id ?? 'id', 8)}`}
        </Typography>
        {/* <ExternalLink
          text={`ID ${limitCharsCentered(pda?.id, 8)}`}
          href="https://www.google.com"
        /> */}
        <Stack
          direction="row"
          justifyContent="space-between"
          gap={5}
          alignItems="center"
        >
          <Typography
            variant="h3"
            sx={{ fontSize: { xs: 24, md: 48 }, my: 2, fontWeight: 400 }}
          >
            {pda?.dataAsset?.title}
          </Typography>
          {pda.dataAsset?.image && (
            <>
              <IconButton onClick={toggleShowImagePDAModal}>
                <Image
                  src={pda?.dataAsset?.image ?? ''}
                  alt={pda?.dataAsset?.title ?? ''}
                  width={96}
                  height={96}
                  style={{ borderRadius: 16 }}
                />
              </IconButton>
              <ModalImage
                open={showImagePDAModal}
                handleClose={toggleShowImagePDAModal}
                handleOpen={() => console.log('open')}
                image={pda?.dataAsset?.image}
                swipeableDrawer
              />
            </>
          )}
        </Stack>
        <Tags tags={pda?.dataAsset?.tags as string[]} />
        <Typography sx={{ mb: 3 }}>{pda?.dataAsset?.description}</Typography>
        <PdaCardInfo pda={pda} viewOnly={viewOnly} />
        {!viewOnly && (
          <>
            <SharedWithCard />
            <SendPda />
            {/* Activies backloged 09/02 */}
            {/* <Activities
              activities={pda.activities}
              activitiesTextsType={{
                Issued: pdaLocale.activities.issued,
                Revoked: pdaLocale.activities.revoked,
                Suspended: pdaLocale.activities.suspended,
                Reactivated: pdaLocale.activities.reactivated,
                Updated: pdaLocale.activities.updated,
              }}
            /> */}
          </>
        )}
      </Stack>
      <Divider
        sx={{
          mb: 5,
          mt: 2,
          mx: NEGATIVE_CONTAINER_PX,
          px: CONTAINER_PX,
        }}
      />
      <DataTable title={pdaLocale.claim} data={claimArray ?? []} />
    </>
  );
}
