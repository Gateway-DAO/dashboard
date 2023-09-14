import type { Meta, StoryObj } from '@storybook/react';

import { CheckButton } from './check-button';

const meta: Meta<typeof CheckButton> = {
  title: 'Components/Buttons/Check Button',
  component: CheckButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CheckButton>;

export const Playground: Story = {
  args: {
    href: '',
    isLoading: false,
    isChecked: true,
    isHover: false,
    clickHandler: () => alert('clicked'),
    labelOn: 'Enabled',
    labelOff: 'Disabled',
    labelOffHover: 'Disable',
  },
};
