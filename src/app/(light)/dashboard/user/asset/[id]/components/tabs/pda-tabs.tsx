import { Tabs, Tab, Typography, Divider, Box, Stack } from '@mui/material';
import { useState } from 'react';
import PDASharingTab from './pda-sharing-tab';
import PDADetailsTab from './pda-details-tab';
import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import { ContentCopy } from '@mui/icons-material';

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
    <>
      <Box sx={{ ml: 4, mt: 2 }}>{children}</Box>
      <Divider />
    </>
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
  username: string;
  did: string;
  copy: (text: string) => Promise<void>;
}) {
  return (
    <Stack direction={'row'} sx={{ mt: 1, mb: 2 }}>
      <GTWAvatar name={username} size={45} />
      <Stack
        direction={'column'}
        onClick={() => copy(did)}
        sx={{ mx: 2, mt: 1 }}
      >
        <Typography variant="subtitle1" sx={{ mt: -1, mx: 1 }}>
          {username}
        </Typography>
        <Stack direction={'row'} sx={{ mt: -0.5 }}>
          <Typography variant="caption" fontWeight={400} fontSize={12}>
            {did}
          </Typography>
          <ContentCopy
            sx={{
              fontSize: 16,
              color: 'text.disabled',
              mt: 0.5,
              mx: 1.2,
              cursor: 'pointer',
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default function PDATabs({ pda }: { pda: any }) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newTab: number) => {
    setValue(newTab);
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        sx={{ borderBottom: 1, width: '100%', maxWidth: '500px' }}
      >
        <Tab key={1} label="Details" sx={{ ml: 3.5 }} />
        <Tab key={2} label="Sharing" />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        <PDADetailsTab pda={pda} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <PDASharingTab pda={pda} />
      </CustomTabPanel>
    </>
  );
}
