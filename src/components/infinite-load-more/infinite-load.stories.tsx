import type { Meta, StoryObj } from '@storybook/react';

import InfiniteLoadMore from './infinite-load-more';

const meta: Meta<typeof InfiniteLoadMore> = {
  title: 'Components/Infinite Load More',
  component: InfiniteLoadMore,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof InfiniteLoadMore>;

export const Playground: Story = {
  args: {
    isLoading: false,
    children: <>Load More</>,
    onLoadMore: () => console.log('loaded'),
  },
};
