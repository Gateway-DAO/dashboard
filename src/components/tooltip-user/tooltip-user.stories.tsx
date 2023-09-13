import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '@mui/material';

import { TooltipUser } from './tooltip-user';

const meta: Meta<typeof TooltipUser> = {
  title: 'Components/Tooltip User',
  component: TooltipUser,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TooltipUser>;

export const Playground: Story = {
  args: {
    isOrganization: false,
    onClose: () => console.log('Closed'),
    right: false,
    picture: '',
    name: 'Name',
    username: 'Username',
    issuance_date: '2018-04-04T16:00:00.000Z',
  },
  render: (props) => (
    <Box sx={{ width: 500, height: 400 }}>
      <TooltipUser {...props} />
    </Box>
  ),
};
