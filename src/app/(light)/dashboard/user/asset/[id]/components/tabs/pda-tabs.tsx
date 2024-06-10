import { Tabs, Tab, Typography, Divider } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import PDASharingTab from './pda-sharing-tab';
import PDADetailsTab from './pda-details-tab';

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

export default function PDATabs({ pda }: { pda: any }) {
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
        <Tab key={1} label="Details" sx={{ ml: 3.5 }} />
        <Tab key={2} label="Sharing" />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        <PDADetailsTab pda={pda} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <PDASharingTab pda={pda} />
      </CustomTabPanel>
    </Box>
  );
}
