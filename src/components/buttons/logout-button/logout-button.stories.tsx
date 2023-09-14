import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '@mui/material';

import LogoutButton from './logout-button';

const meta: Meta<typeof LogoutButton> = {
  title: 'Components/Buttons/Logout Button',
  component: LogoutButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LogoutButton>;

export const Playground: Story = {
  args: {},
  render: () => (
    <Box
      sx={{
        width: 500,
        position: 'relative',
        height: 100,
      }}
    >
      <LogoutButton />
    </Box>
  ),
};
