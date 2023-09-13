import type { Meta, StoryObj } from '@storybook/react';

import { Typography } from '@mui/material';

import SwipeableDrawerMobile from './swipeable-drawer-mobile';

const meta: Meta<typeof SwipeableDrawerMobile> = {
  title: 'Components/Modals/Swipeable Drawer Mobile',
  component: SwipeableDrawerMobile,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SwipeableDrawerMobile>;

export const Playground: Story = {
  args: {
    open: true,
    children: (
      <Typography variant="h5" sx={{ mt: 5 }}>
        Test
      </Typography>
    ),
  },
};
