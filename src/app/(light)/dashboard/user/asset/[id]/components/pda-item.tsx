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

import {
  Box,
  Card,
  Divider,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';

import IssuerPDAActions from './issuer-pda-actions';
import ModalImage from './modal-image';
import PdaCardInfo from './pda-card-info';
import ShareCopy from './share-copy/share-copy';
import SharedWithCard from './shared-with-card';
import GTWTab from '@/components/tabs/gtw-tab';
import GTWTabs from '@/components/tabs/gtw-tabs-links';
import routes from '@/constants/routes';
import { common } from '@mui/material/colors';
import { useState } from 'react';
import CopyButton from '@/components/copy-button/copy-button';

type Props = {
  pda: any;
  isProofPda?: boolean;
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function PDAItem({ pda, isProofPda = false }: Props) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Stack direction={'row'} justifyContent={'space-between'}>
      <Stack direction={'column'} sx={{ ...WIDTH_CENTERED, my: 2, mt: -1.1 }}>
        <Stack
          direction="column"
          component={Card}
          variant="outlined"
          gap={8}
          sx={{ bgcolor: '#E5DFEA' }}
          alignItems="start"
        >
          <Typography
            variant="body2"
            id="pda-title"
            sx={{ fontSize: 16, my: 2, mx: 4, fontWeight: 700 }}
          >
            {pda?.issuer?.username}
          </Typography>
          <Typography
            variant="body2"
            id="pda-title"
            sx={{ fontSize: { xs: 20, md: 34 }, mx: 4, my: 2, fontWeight: 400 }}
          >
            {pda?.dataAsset?.title}
          </Typography>
        </Stack>
        <Tags tags={pda?.dataAsset?.dataModel?.tags as string[]} />
        <Typography sx={{ mb: 3 }}>{pda?.dataAsset?.description}</Typography>
        {/* <PdaCardInfo pda={pda} isProofPda={isProofPda} /> */}
        {!isProofPda && (
          <>
            {/* <SharedWithCard pda={pda} />
            <ShareCopy pda={pda} />
            <IssuerPDAActions pda={pda} /> */}
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
        <ClaimValuesList data={pda?.dataAsset?.claimArray} />
      </Stack>
      <Box
        sx={{
          borderLeft: 1,
          mx: 12,
          px: 5,
        }}
      >
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Details" />
          <Tab label="Sharing" />
          <Tab label="Activity" />
        </Tabs>
        <CustomTabPanel value={value} index={0}>
          <Typography variant="body2">Uploaded By</Typography>
          <Stack direction={'row'}>
            <Typography variant="body2">{pda.issuer.username}</Typography>
            <CopyButton variant="outlined" text={pda.issuer.did} />
          </Stack>
          <Typography variant="body2">Owner</Typography>
          <Stack direction={'row'}>
            <Typography variant="body2">{pda.owner.username}</Typography>
            <CopyButton variant="outlined" text={pda.owner.did} />
          </Stack>
          <Typography variant="body2">Created At</Typography>
          <Typography variant="body2">{pda.issuer.username}</Typography>
          <Typography variant="body2">Last Modified</Typography>
          <Typography variant="body2">{pda.issuer.username}</Typography>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}></CustomTabPanel>
        <CustomTabPanel value={value} index={2}></CustomTabPanel>
      </Box>
    </Stack>
  );
}
