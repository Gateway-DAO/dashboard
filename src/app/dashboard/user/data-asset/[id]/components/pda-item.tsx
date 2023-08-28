'use client';

import Image from 'next/image';

import Activities from '@/components/activities/activities';
import ExternalLink from '@/components/external-link/external-link';
import Tags from '@/components/tags/tags';
import { pda as pdaLocale } from '@/locale/en/pda';
import { PdaQuery } from '@/services/protocol/types';
import {
  CONTAINER_PX,
  NEGATIVE_CONTAINER_PX,
} from '@/theme/config/style-tokens';
import { limitCharsCentered } from '@/utils/string';
import { useToggle } from '@react-hookz/web';

import { Divider, IconButton, Stack, Typography } from '@mui/material';

import DataTable from './data-table';
import ModalImage from './modal-image';
import PdaCardInfo from './pda-card-info';
import SendPda from './send-pda/send-pda';
import SharedWithCard from './shared-with-card';

type Props = {
  pda: PdaQuery['credential'];
};

export default function PDAItem({ pda }: Props) {
  const [showImagePDAModal, toggleShowImagePDAModal] = useToggle(false);
  return (
    <>
      <Stack sx={{ maxWidth: 550, mx: 'auto', my: 2 }}>
        <ExternalLink
          text={`ID ${limitCharsCentered(pda?.id, 8)}`}
          href="https://www.google.com"
        />
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
            {pda?.title}
          </Typography>
          {pda.image && (
            <>
              <IconButton onClick={toggleShowImagePDAModal}>
                <Image
                  src={pda?.image ?? ''}
                  alt={pda?.title}
                  width={96}
                  height={96}
                  style={{ borderRadius: 16 }}
                />
              </IconButton>
              <ModalImage
                open={showImagePDAModal}
                handleClose={toggleShowImagePDAModal}
                handleOpen={() => console.log('open')}
                image={pda.image}
                swipeableDrawer
              />
            </>
          )}
        </Stack>
        <Tags tags={pda?.dataModel?.tags as string[]} />
        <Typography sx={{ mb: 3 }}>{pda?.description}</Typography>
        <PdaCardInfo pda={pda} />
        <SharedWithCard />
        <SendPda />
        <Activities
          activities={pda.activities}
          activitiesTextsType={{
            Issued: pdaLocale.activities.issued,
            Revoked: pdaLocale.activities.revoked,
            Suspended: pdaLocale.activities.suspended,
            Reactivated: pdaLocale.activities.reactivated,
            Updated: pdaLocale.activities.updated,
          }}
        />
      </Stack>
      <Divider
        sx={{
          mb: 5,
          mt: 2,
          mx: NEGATIVE_CONTAINER_PX,
          px: CONTAINER_PX,
        }}
      />
      <DataTable title={pdaLocale.claim} data={pda?.claimArray} />
    </>
  );
}
