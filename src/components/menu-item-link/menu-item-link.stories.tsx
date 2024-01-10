import type { Meta, StoryObj } from '@storybook/react';

import MenuItemLink from './menu-item-link';

const meta: Meta<typeof MenuItemLink> = {
  title: 'Components/Menu Item Link',
  component: MenuItemLink,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MenuItemLink>;

export const Playground: Story = {
  args: {
    href: '',
    children: <>Test</>,
  },
};
