import type { Meta, StoryObj } from '@storybook/react';

import { Stack } from '@mui/material';

import GTWAvatar from './gtw-avatar';

const meta: Meta<typeof GTWAvatar> = {
  title: 'Components/GTW Avatar',
  component: GTWAvatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GTWAvatar>;

export const Variants: Story = {
  render: () => (
    <Stack spacing={2} maxWidth={300}>
      <GTWAvatar src="test" name="" />
      <GTWAvatar src="" name="" />
      <GTWAvatar src="" />
    </Stack>
  ),
};

export const Playground: Story = {
  args: {
    src: '',
    name: 'Lorem',
  },
};
