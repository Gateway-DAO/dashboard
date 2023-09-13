import type { Meta, StoryObj } from '@storybook/react';

import { CenteredLoader } from './centered-loader';

const meta: Meta<typeof CenteredLoader> = {
  title: 'Components/Loadings/Centered Loader',
  component: CenteredLoader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CenteredLoader>;

export const Playground: Story = {
  args: {
    progressProps: { size: 24 },
  },
};
