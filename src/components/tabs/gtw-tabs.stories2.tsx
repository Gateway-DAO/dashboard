import { common } from '@/locale/en/common';
import type { Meta, StoryObj } from '@storybook/react';

import GTWTab from './gtw-tab';
import GTWTabs from './gtw-tabs-links';

const meta: Meta<typeof GTWTabs> = {
  title: 'Components/Tabs/GTW Tabs',
  component: GTWTabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GTWTabs>;

export const Playground: Story = {
  args: {
    children: (
      <>
        <GTWTab label={common.general.received} href={''} />
        <GTWTab label={common.general.issued} href={''} />
      </>
    ),
  },
};
