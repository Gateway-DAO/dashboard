import type { Meta, StoryObj } from '@storybook/react';

import ModalTitle from './modal-title';

const meta: Meta<typeof ModalTitle> = {
  title: 'Components/Modals/Modal Title',
  component: ModalTitle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ModalTitle>;

export const Playground: Story = {
  args: {
    onClose: () => console.log('Closed'),
  },
};
