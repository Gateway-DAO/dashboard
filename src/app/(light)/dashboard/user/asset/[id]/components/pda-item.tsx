'use client';

import Image from 'next/image';
import { useMemo } from 'react';

import Tags from '@/components/tags/tags';
import { useGtwSession } from '@/context/gtw-session-provider';
import { pda as pdaLocale } from '@/locale/en/pda';
import { PdaQuery } from '@/services/protocol/types';
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
import IssuePda from './issue-pda/issue-pda';
import ModalImage from './modal-image';
import PdaCardInfo from './pda-card-info';
import { RevokePDA } from './revoke-pda/revoke-pda';
import SharedWithCard from './shared-with-card';
import { SuspendOrMakeValidPDA } from './suspend-or-make-valid-pda/suspend-or-make-valid-pda';

type Props = {
  pda: PartialDeep<PdaQuery['PDAbyId'] | null>;
  viewOnly?: boolean;
};

export default function PDAItem({ pda, viewOnly = false }: Props) {
  const { session } = useGtwSession();
  const [showImagePDAModal, toggleShowImagePDAModal] = useToggle(false);

  const isIssuer = useMemo(
    () =>
      session.user.gatewayId === pda?.dataAsset?.issuer?.user?.gatewayId ||
      session?.user?.accesses?.find(
        (access) =>
          pda?.dataAsset?.organization?.gatewayId ===
          access?.organization?.gatewayId
      ),
    [pda, session]
  );

  const isOwner = useMemo(
    () => session.user.gatewayId === pda?.dataAsset?.owner?.user?.gatewayId,
    [pda, session]
  );

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
            id="pda-title"
            sx={{ fontSize: { xs: 24, md: 48 }, my: 2, fontWeight: 400 }}
          >
            {pda?.dataAsset?.title}
          </Typography>
          {pda?.dataAsset?.image && (
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
        <Tags tags={pda?.dataAsset?.dataModel?.tags as string[]} />
        <Typography sx={{ mb: 3 }}>{pda?.dataAsset?.description}</Typography>
        <PdaCardInfo pda={pda} viewOnly={viewOnly} />
        {!viewOnly && (
          <>
            <SharedWithCard pdaId={pda?.id as string} />

            {isOwner && <IssuePda pda={pda} />}
            {isIssuer && (
              <Stack direction="row" gap={1}>
                <SuspendOrMakeValidPDA pda={pda} />
                <RevokePDA pda={pda} />
              </Stack>
            )}

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

      <DataTable title={pdaLocale.claim} data={pda?.dataAsset?.claimArray} />
    </>
  );
}
