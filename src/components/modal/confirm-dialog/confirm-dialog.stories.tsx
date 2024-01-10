import type { Meta, StoryObj } from '@storybook/react';

import ConfirmDialog from './confirm-dialog';

const meta: Meta<typeof ConfirmDialog> = {
  title: 'Components/Modals/Confirm Dialog',
  component: ConfirmDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ConfirmDialog>;

export const Playground: Story = {
  args: {
    title: 'Lorem Ipsum',
    children: <>Test</>,
    open: false,
    onConfirm: () => alert('Confirmed'),
  },
};
