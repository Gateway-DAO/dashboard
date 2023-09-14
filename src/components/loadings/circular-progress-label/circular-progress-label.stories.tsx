import type { Meta, StoryObj } from '@storybook/react';

import CircularProgressWithLabel from './circular-progress-label';

const meta: Meta<typeof CircularProgressWithLabel> = {
  title: 'Components/Loadings/Circular Progress Label',
  component: CircularProgressWithLabel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CircularProgressWithLabel>;

export const Playground: Story = {
  args: {
    label: 'PDA',
    value: 67,
    size: 48,
  },
};
