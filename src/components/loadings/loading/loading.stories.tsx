import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '@mui/material';

import Loading from './loading';

const meta: Meta<typeof Loading> = {
  title: 'Components/Loadings/Loading',
  component: Loading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Loading>;

export const Playground: Story = {
  args: {
    fullScreen: false,
  },
  render: (props) => (
    <Box sx={{ width: 500, height: 200 }}>
      <Loading {...props} />
    </Box>
  ),
};
