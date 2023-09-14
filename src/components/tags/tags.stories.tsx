import type { Meta, StoryObj } from '@storybook/react';

import Tags from './tags';

const meta: Meta<typeof Tags> = {
  title: 'Components/Tags',
  component: Tags,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tags>;

export const Playground: Story = {
  args: {
    tags: ['Lorem', 'Ipsum', 'Dolor'],
  },
};
