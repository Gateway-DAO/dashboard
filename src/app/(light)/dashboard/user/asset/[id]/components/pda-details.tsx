'use client';

import { useState } from 'react';
import CopyButton from '@/components/copy-button/copy-button';
import { pda } from '@/constants/documentationRoutes';
import { Tabs, Tab, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function PDADetails({ pda, isProofPda = false }: Props) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Tabs
        value={value}
        onChange={handleChange}
        sx={{ borderBottom: 1, width: '100%', maxWidth: '500px' }}
      >
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
        <Typography variant="body2">{pda.issuanceDate}</Typography>
        <Typography variant="body2">Last Modified</Typography>
        <Typography variant="body2">{pda.lastUpdated}</Typography>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {pda.sharing.map((user: any) => (
          <Typography variant="body2">test</Typography>
        ))}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Typography variant="body2">Uploaded By</Typography>
      </CustomTabPanel>
    </Box>
  );
}
