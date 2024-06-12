import { useState } from 'react';

import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import { DataModelQuery, PrivateDataAsset } from '@/services/protocol-v3/types';
import { limitCharsCentered, limitCharsOffset } from '@/utils/string';

import { ContentCopy } from '@mui/icons-material';
import {
  Tabs,
  Tab,
  Typography,
  Divider,
  Box,
  Stack,
  Button,
  IconButton,
} from '@mui/material';
import { spacing } from '@mui/system';

import PDADetailsTab from './pda-details-tab';
import PDASharingTab from './pda-sharing-tab';

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
      {value === index && <>{children}</>}
    </div>
  );
}

export function IndividualDetailRow({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Stack
      direction="column"
      gap={1}
      sx={{
        px: {
          xs: 2,
          lg: 4,
        },
        py: 2,
      }}
    >
      {children}
    </Stack>
  );
}

export function RowText({ title }: { title: string }) {
  return (
    <Typography variant="caption" fontWeight={400} fontSize={12}>
      {title}
    </Typography>
  );
}

export function RowSecondaryText({ text }: { text: string }) {
  return (
    <Typography variant="body2" sx={{ mt: 1, mb: 1.5 }}>
      {text}
    </Typography>
  );
}

export function UserDetails({
  username,
  did,
  copy,
}: {
  username?: string | null;
  did: string;
  copy: (text: string) => Promise<void>;
}) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyItems="flex-start"
      borderRadius={0}
    >
      <GTWAvatar name={did} alt={username ?? did} size={45} />
      <Stack
        component="span"
        direction={!!username ? 'column' : 'row'}
        alignItems={!!username ? 'flex-start' : 'center'}
        pl={2}
        width="100%"
        gap={!!username ? 0 : 1.2}
      >
        <Typography component="span" variant="subtitle1" color="text.primary">
          {username ?? limitCharsOffset(did, 15, 5)}
        </Typography>
        {!!username ? (
          <Stack
            component="span"
            direction="row"
            alignItems="center"
            lineHeight={1}
            justifyContent="flex-start"
            gap={1.2}
            sx={{ mt: -1 }}
          >
            <Typography
              component="span"
              variant="caption"
              fontWeight={400}
              fontSize={12}
              color="text.secondary"
              lineHeight={1}
              textOverflow="ellipsis"
              overflow="hidden"
            >
              {limitCharsOffset(did, 19, 5)}
            </Typography>
            <IconButton onClick={() => copy(did)}>
              <ContentCopy
                sx={{
                  fontSize: 16,
                  color: 'text.disabled',
                }}
              />
            </IconButton>
          </Stack>
        ) : (
          <IconButton onClick={() => copy(did)}>
            <ContentCopy
              sx={{
                fontSize: 16,
                color: 'text.disabled',
              }}
            />
          </IconButton>
        )}
      </Stack>
    </Stack>
  );
}

type Props = {
  pda: PrivateDataAsset;
  dataModel: DataModelQuery['dataModel'];
};

export default function PDATabs({ pda, dataModel }: Props) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newTab: number) => {
    setValue(newTab);
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        sx={{ borderBottom: 1, width: '100%', borderColor: 'divider' }}
      >
        <Tab key={1} label="Details" sx={{ ml: 3.5 }} />
        <Tab key={2} label="Sharing" />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        <PDADetailsTab pda={pda} dataModel={dataModel} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <PDASharingTab pda={pda} />
      </CustomTabPanel>
    </>
  );
}
