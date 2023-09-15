import type { Meta, StoryObj } from '@storybook/react';

import CopyTextButton from './copy-text-button';

const meta: Meta<typeof CopyTextButton> = {
  title: 'Components/Copy Text Button',
  component: CopyTextButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CopyTextButton>;

export const Playground: Story = {
  args: {
    text: 'Lorem ipsum',
    sucessMessage: 'Copied to clipboard',
    limit: 12,
  },
};
