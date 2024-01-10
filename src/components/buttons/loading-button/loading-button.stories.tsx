import type { Meta, StoryObj } from '@storybook/react';

import { LoadingButton } from './loading-button';

const meta: Meta<typeof LoadingButton> = {
  title: 'Components/Buttons/Loading Button',
  component: LoadingButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LoadingButton>;

export const Playground: Story = {
  args: {
    href: '',
    isLoading: false,
    children: <>Test</>,
    variant: 'contained',
  },
};
