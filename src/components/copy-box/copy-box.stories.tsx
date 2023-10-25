import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '@mui/material';

import CopyBox from './copy-box';

const meta: Meta<typeof CopyBox> = {
  title: 'Components/Copy Box',
  component: CopyBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CopyBox>;

export const Playground: Story = {
  args: {
    title: 'ID',
    value: '134jsd-asdf231s-asf23sdfas',
  },
  render: (props) => (
    <Box sx={{ width: 500 }}>
      <CopyBox {...props} />
    </Box>
  ),
};
