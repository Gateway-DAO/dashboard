import type { Meta, StoryObj } from '@storybook/react';

import CopyPaste from './copy-paste';

const meta: Meta<typeof CopyPaste> = {
  title: 'Components/Copy Paste',
  component: CopyPaste,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CopyPaste>;

export const Playground: Story = {
  args: {
    text: 'text to copy',
    sucessMessage: 'Copied to clipboard',
    limit: 12,
  },
};
