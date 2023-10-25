import { settings } from '@/locale/en/settings';
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
    textKey: settings.connected_accounts.modal_confirm_delete.text_key,
    buttonText: settings.connected_accounts.modal_confirm_delete.text_key,
    checkText: settings.connected_accounts.modal_confirm_delete.checkbox,
    onCancel: () => console.log('canceled'),
    onConfirm: () => console.log('confirmed'),
  },
  render: (props) => (
    <Box sx={{ width: 500 }}>
      <ConfirmDelete {...props} />
    </Box>
  ),
};
