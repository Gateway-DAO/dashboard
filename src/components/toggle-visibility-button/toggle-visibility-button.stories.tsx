import type { Meta, StoryObj } from '@storybook/react';

import ToggleVisibilityButton from './toggle-visibility-button';

const meta: Meta<typeof ToggleVisibilityButton> = {
  title: 'Components/Toggle visibility button',
  component: ToggleVisibilityButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ToggleVisibilityButton>;

export const Playground: Story = {
  args: {
    isVisible: false,
  },
};
