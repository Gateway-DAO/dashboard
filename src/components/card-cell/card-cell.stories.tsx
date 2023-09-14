import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '@mui/material';

import CardCell from './card-cell';

const meta: Meta<typeof CardCell> = {
  title: 'Components/Card Cell',
  component: CardCell,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CardCell>;

export const Playground: Story = {
  args: {
    label: 'Label',
    children: <>Test</>,
    alignRight: false,
    disabled: false,
    margin: false,
    px: 2,
    py: 2,
  },
  render: (props) => (
    <Box
      sx={{
        width: 500,
        position: 'relative',
        height: 100,
      }}
    >
      <CardCell {...props}>{props.children}</CardCell>
    </Box>
  ),
};
