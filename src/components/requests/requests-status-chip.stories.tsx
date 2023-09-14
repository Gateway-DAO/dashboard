import { DataResourceStatus } from '@/services/protocol/types';
import type { Meta, StoryObj } from '@storybook/react';

import { Stack } from '@mui/material';

import RequestStatusChip from './request-status-chip';

const meta: Meta<typeof RequestStatusChip> = {
  title: 'Components/Request Status Chip',
  component: RequestStatusChip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RequestStatusChip>;

export const Variants: Story = {
  render: () => (
    <Stack direction="row" gap={2}>
      <Stack spacing={2} maxWidth={300}>
        <RequestStatusChip
          variant="filled"
          status={DataResourceStatus.Accepted}
        />
        <RequestStatusChip
          variant="filled"
          status={DataResourceStatus.Expired}
        />
        <RequestStatusChip
          variant="filled"
          status={DataResourceStatus.Pending}
        />
        <RequestStatusChip
          variant="filled"
          status={DataResourceStatus.Rejected}
        />
      </Stack>
      <Stack spacing={2} maxWidth={300}>
        <RequestStatusChip
          variant="outlined"
          status={DataResourceStatus.Accepted}
        />
        <RequestStatusChip
          variant="outlined"
          status={DataResourceStatus.Expired}
        />
        <RequestStatusChip
          variant="outlined"
          status={DataResourceStatus.Pending}
        />
        <RequestStatusChip
          variant="outlined"
          status={DataResourceStatus.Rejected}
        />
      </Stack>
    </Stack>
  ),
};

export const Playground: Story = {
  args: {
    status: DataResourceStatus.Accepted,
  },
};
