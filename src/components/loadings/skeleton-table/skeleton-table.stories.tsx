import type { Meta, StoryObj } from '@storybook/react';

import SkeletonTable from './skeleton-table';

const meta: Meta<typeof SkeletonTable> = {
  title: 'Components/Loadings/Skeleton Table',
  component: SkeletonTable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SkeletonTable>;

export const Playground: Story = {
  args: {
    columns: 4,
  },
};
