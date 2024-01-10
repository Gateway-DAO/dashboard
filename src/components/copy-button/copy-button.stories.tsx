import type { Meta, StoryObj } from '@storybook/react';

import CopyButton from './copy-button';

const meta: Meta<typeof CopyButton> = {
  title: 'Components/Copy Button',
  component: CopyButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

export const Playground: Story = {
  args: {
    text: 'Lorem ipsum',
    sucessMessage: 'Copied to clipboard',
  },
};
