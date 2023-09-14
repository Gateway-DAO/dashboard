import type { Meta, StoryObj } from '@storybook/react';

import BackButton from './back-button';

const meta: Meta<typeof BackButton> = {
  title: 'Components/Buttons/Back Button',
  component: BackButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BackButton>;

export const Playground: Story = {
  args: {
    href: '#',
  },
};
