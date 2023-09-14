import type { Meta, StoryObj } from '@storybook/react';

import TitleLayout from './title-layout';

const meta: Meta<typeof TitleLayout> = {
  title: 'Components/Title Layout',
  component: TitleLayout,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TitleLayout>;

export const Playground: Story = {
  args: {
    title: 'Test title',
    subtitle: 'Test subtitle',
    titleId: 'test-title',
  },
};
