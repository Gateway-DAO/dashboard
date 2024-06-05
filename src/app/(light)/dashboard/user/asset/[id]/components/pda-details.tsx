'use client';

import { useState } from 'react';
import CopyButton from '@/components/copy-button/copy-button';
import { pda } from '@/constants/documentationRoutes';
import {
  Tabs,
  Tab,
  Typography,
  Divider,
  Button,
  IconButton,
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import CopyBox from '@/components/copy-box/copy-box';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { errorMessages } from '@/locale/en/errors';
import { useSnackbar } from 'notistack';
import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import { DATE_FORMAT } from '@/constants/date';
import dayjs from 'dayjs';
import { ChevronRightOutlined } from '@mui/icons-material';

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
      {value === index && <>{children}</>}
    </div>
  );
}

export default function PDADetails({ pda, isProofPda = false }: Props) {
  const [value, setValue] = useState(0);
  const { enqueueSnackbar } = useSnackbar();

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      enqueueSnackbar('Copied Successfully!');
    } catch (err) {
      enqueueSnackbar(errorMessages.UNEXPECTED_ERROR, { variant: 'error' });
    }
  };

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
        <Tab key={3} label="Activity" />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        <Box sx={{ ml: 4, mt: 2 }}>
          <Typography variant="caption" fontWeight={400} fontSize={12}>
            Uploaded By
          </Typography>
          <Stack direction={'row'} sx={{ mt: 1, mb: 2 }}>
            <GTWAvatar name={pda.issuer.username} size={45} />
            <Stack
              direction={'column'}
              onClick={() => copy(pda.issuer.did)}
              sx={{ mx: 2, mt: 1 }}
            >
              <Typography variant="subtitle1" sx={{ mt: -1, mx: 1 }}>
                {pda.issuer.username}
              </Typography>
              <Stack direction={'row'} sx={{ mt: -0.5 }}>
                <Typography variant="caption" fontWeight={400} fontSize={12}>
                  {pda.issuer.did}
                </Typography>
                <ContentCopyIcon
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
        </Box>

        <Divider />
        <Box sx={{ ml: 4, mt: 2 }}>
          <Typography variant="caption" fontWeight={400} fontSize={12}>
            Owner
          </Typography>
          <Stack direction={'row'} sx={{ mt: 1, mb: 2 }}>
            <GTWAvatar name={pda.owner.username} size={45} />
            <Stack
              direction={'column'}
              onClick={() => copy(pda.owner.did)}
              sx={{ mx: 2, mt: 1 }}
            >
              <Typography variant="subtitle1" sx={{ mt: -1, mx: 1 }}>
                {pda.owner.username}
              </Typography>
              <Stack direction={'row'} sx={{ mt: -0.5 }}>
                <Typography variant="caption" fontWeight={400} fontSize={12}>
                  {pda.owner.did.length > 10
                    ? pda.owner.did.substring(0, 10) + '...'
                    : pda.owner.did}
                </Typography>
                <ContentCopyIcon
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
        </Box>
        <Divider />
        <Box sx={{ ml: 4, mt: 2 }}>
          <Typography variant="caption" fontWeight={400} fontSize={12}>
            Created At
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, mb: 1.5 }}>
            {dayjs(pda.issuanceDate).format(DATE_FORMAT)}
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ ml: 4, mt: 2 }}>
          <Typography variant="caption" fontWeight={400} fontSize={12}>
            Last Modified
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, mb: 1.5 }}>
            {dayjs(pda.lastUpdated).format(DATE_FORMAT)}
          </Typography>
        </Box>
        <Divider />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Box sx={{ ml: 4, mt: 2 }}>
          {pda.sharing.map((user: any) => {
            return (
              <>
                <Stack
                  direction={'row'}
                  justifyContent={'space-between'}
                  sx={{ mt: 1, mb: 2, width: '47%' }}
                >
                  <Stack direction={'row'}>
                    <GTWAvatar name={user.did} size={45} />
                    <Typography
                      variant="body1"
                      fontWeight={400}
                      sx={{ mt: 1, mx: 3 }}
                    >
                      {user.username}
                    </Typography>
                  </Stack>
                  <IconButton>
                    <ChevronRightOutlined />
                  </IconButton>
                </Stack>
                <Divider />
              </>
            );
          })}
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Typography variant="body2">Uploaded By</Typography>
      </CustomTabPanel>
    </Box>
  );
}
