import type { Meta, StoryObj } from '@storybook/react';

import ExternalLink from './external-link';

const meta: Meta<typeof ExternalLink> = {
  title: 'Components/External Link',
  component: ExternalLink,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ExternalLink>;

export const Playground: Story = {
  args: {
    text: 'Lorem ipsum',
    href: '',
    size: 'small',
  },
};
