import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '@mui/material';

import { Transaction } from './transaction';

const meta: Meta<typeof Transaction> = {
  title: 'Components/Transaction',
  component: Transaction,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Transaction>;

export const Playground: Story = {
  render: (props) => (
    <Box sx={{ width: 500 }}>
      <Transaction />
    </Box>
  ),
};
