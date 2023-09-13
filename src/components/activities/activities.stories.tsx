import { pda } from '@/locale/en/pda';
import {
  CredentialActivity,
  CredentialStatus,
} from '@/services/protocol/types';
import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '@mui/material';

import Activities from './activities';

const meta: Meta<typeof Activities> = {
  title: 'Components/Activities',
  component: Activities,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Activities>;

export const Playground: Story = {
  args: {
    activitiesTextsType: {
      Issued: pda.activities.issued,
      Revoked: pda.activities.revoked,
      Suspended: pda.activities.suspended,
      Reactivated: pda.activities.reactivated,
      Updated: pda.activities.updated,
    },
    activities: [
      {
        type: CredentialActivity.Issued,
        txHash: 'txhash.com',
        timestamp: '2018-04-04T16:00:00.000Z',
        newStatus: CredentialStatus.Expired,
        oldStatus: CredentialStatus.Valid,
        credential: {} as any,
        oldUrl: '',
        newUrl: '',
      },
      {
        type: CredentialActivity.Revoked,
        txHash: 'txhash.com',
        timestamp: '2018-04-04T16:00:00.000Z',
        newStatus: CredentialStatus.Expired,
        oldStatus: CredentialStatus.Valid,
        credential: {} as any,
        oldUrl: '',
        newUrl: '',
      },
    ],
  },
  render: (props) => (
    <Box sx={{ width: 500 }}>
      <Activities {...props} />
    </Box>
  ),
};
