import type { Meta, StoryObj } from '@storybook/react';

import { Typography } from '@mui/material';

import ModalRight from './modal-right';

const meta: Meta<typeof ModalRight> = {
  title: 'Components/Modals/Modal Right',
  component: ModalRight,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ModalRight>;

export const Playground: Story = {
  args: {
    children: (
      <Typography variant="h5" sx={{ mt: 5 }}>
        Test
      </Typography>
    ),
    open: true,
    onClose: () => alert('Closed'),
  },
};
