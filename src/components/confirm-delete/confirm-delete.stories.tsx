import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '@mui/material';

import { ConfirmDelete } from './confirm-delete';

const meta: Meta<typeof ConfirmDelete> = {
  title: 'Components/Confirm Delete',
  component: ConfirmDelete,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ConfirmDelete>;

export const Playground: Story = {
  args: {
    textKey: 'deactivate my gateway id',
    buttonText: 'deactivate my gateway id',
    checkText: `I acknowledge that upon Gateway ID deactivation, I won't be able undo these actions`,
    onCancel: () => console.log('canceled'),
    onConfirm: () => console.log('confirmed'),
  },
  render: (props) => (
    <Box sx={{ width: 500 }}>
      <ConfirmDelete {...props} />
    </Box>
  ),
};
