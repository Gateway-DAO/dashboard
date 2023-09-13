import type { Meta, StoryObj } from '@storybook/react';

import AvatarTextCell from './avatar-text-cell';

const meta: Meta<typeof AvatarTextCell> = {
  title: 'Components/Avatar Text Cell',
  component: AvatarTextCell,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AvatarTextCell>;

export const Playground: Story = {
  args: {
    name: 'Avatar',
  },
};
