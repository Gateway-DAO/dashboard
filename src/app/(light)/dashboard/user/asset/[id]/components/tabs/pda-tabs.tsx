'use client';
import { useState } from 'react';

import { PrivateDataAsset } from '@/services/protocol-v3/types';

import { Tabs, Tab } from '@mui/material';

import PDADetailsTab from './pda-details-tab';
import PDASharingTab from './pda-sharing-tab';

type Props = {
  pda: PrivateDataAsset;
  isOwner: boolean;
};

export default function PDATabs({ pda }: Props) {
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
        <Tab
          key={1}
          label="Details"
          sx={{
            ml: {
              xs: 0,
              lg: 3.5,
            },
          }}
        />
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
