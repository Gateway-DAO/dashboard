import { errorMessages } from '@/locale/en/errors';
import type { Meta, StoryObj } from '@storybook/react';

import DefaultError from './default-error';

const meta: Meta<typeof DefaultError> = {
  title: 'Components/Default Error',
  component: DefaultError,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DefaultError>;

export const Playground: Story = {
  args: {
    isModal: false,
    message: errorMessages.PAGE_NOT_FOUND,
  },
};
