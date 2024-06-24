import { PdaStatus } from '@/services/protocol-v3/types';
import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '@mui/material';

import { TextStatusChip } from './text-status-chip';

const meta: Meta<typeof TextStatusChip> = {
  title: 'Components/Text Status Chip',
  component: TextStatusChip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TextStatusChip>;

export const Playground: Story = {
  render: () => (
    <Box sx={{ width: 500 }}>
      <TextStatusChip status={PdaStatus.Valid} />
    </Box>
  ),
};
