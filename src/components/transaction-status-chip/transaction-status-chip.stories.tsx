import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '@mui/material';

import TransactionStatusChip from './transaction-status-chip';

const meta: Meta<typeof TransactionStatusChip> = {
  title: 'Components/Transaction Status Chip',
  component: TransactionStatusChip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TransactionStatusChip>;

export const Playground: Story = {
  render: (props) => (
    <Box sx={{ width: 500 }}>
      <TransactionStatusChip status="earning" />
    </Box>
  ),
};
