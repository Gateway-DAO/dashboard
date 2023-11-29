/* eslint-disable @next/next/no-img-element */
'use client';

import ClaimValuesList from '@/app/(light)/dashboard/components/claim-values-list/claim-values-list';
import CopyTextButton from '@/components/copy-text-button/copy-text-button';
import Tags from '@/components/tags/tags';
import { pda as pdaLocale } from '@/locale/en/pda';
import { PdaQuery } from '@/services/protocol/types';
import {
  CONTAINER_PX,
  NEGATIVE_CONTAINER_PX,
  WIDTH_CENTERED,
} from '@/theme/config/style-tokens';
import { useToggle } from '@react-hookz/web';
import { PartialDeep } from 'type-fest';

import { Divider, IconButton, Stack, Typography } from '@mui/material';

import IssuerPDAActions from './issuer-pda-actions';
import ModalImage from './modal-image';
import PdaCardInfo from './pda-card-info';
import ShareCopy from './share-copy/share-copy';
import SharedWithCard from './shared-with-card';

type Props = {
  pda: PartialDeep<PdaQuery['PDA'] | null>;
  isProofPda?: boolean;
};

export default function PDAItem({ pda, isProofPda = false }: Props) {
  const [showImagePDAModal, toggleShowImagePDAModal] = useToggle(false);

  return (
    <>
      <Stack sx={{ ...WIDTH_CENTERED, my: 2 }}>
        <Stack direction="row" alignItems="center">
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            ID
          </Typography>
          <CopyTextButton text={pda?.id as string} limit={12} size={14} />
        </Stack>
        {/* <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          {`ID ${limitCharsCentered(pda?.id ?? 'id', 8)}`}
        </Typography> */}
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
                <img
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
        <PdaCardInfo pda={pda} isProofPda={isProofPda} />
        {!isProofPda && (
          <>
            <SharedWithCard pda={pda} />
            <ShareCopy pda={pda} />
            <IssuerPDAActions pda={pda} />
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

      <ClaimValuesList
        title={pdaLocale.claim}
        data={pda?.dataAsset?.claimArray}
      />
    </>
  );
}
