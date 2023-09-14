import type { Meta, StoryObj } from '@storybook/react';

import { ConnectNow } from './connect-now';
const meta: Meta<typeof ConnectNow> = {
  title: 'Components/Buttons/Connect now',
  component: ConnectNow,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ConnectNow>;

export const Playground: Story = {
  args: {},
};
