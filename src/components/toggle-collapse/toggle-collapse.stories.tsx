import type { Meta, StoryObj } from '@storybook/react';

import ToggleCollapse from './toggle-collapse';

const meta: Meta<typeof ToggleCollapse> = {
  title: 'Components/Toggle Collapse',
  component: ToggleCollapse,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ToggleCollapse>;

export const Playground: Story = {
  args: {
    initialVisible: false,
  },
};
