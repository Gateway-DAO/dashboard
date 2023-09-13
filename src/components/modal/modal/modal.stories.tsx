import type { Meta, StoryObj } from '@storybook/react';

import Modal from './modal';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modals/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Playground: Story = {
  args: {
    modalTitle: 'Lorem Ipsum',
    modalDescription: 'Description',
    fullWidth: false,
    children: <>Test</>,
    open: false,
    handleClose: () => alert('Closed'),
  },
};
