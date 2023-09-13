import type { Meta, StoryObj } from '@storybook/react';

import GTWTab from './gtw-tab';

const meta: Meta<typeof GTWTab> = {
  title: 'Components/Tabs/GTW Tab',
  component: GTWTab,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GTWTab>;

export const Playground: Story = {
  args: {
    label: 'Lorem',
    href: '',
  },
};
