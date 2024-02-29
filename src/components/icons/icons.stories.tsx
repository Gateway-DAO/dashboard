import type { Meta, StoryObj } from '@storybook/react';

import { Box, Stack, SvgIconProps, Typography } from '@mui/material';

import * as Icons from './index';

const meta = {
  title: 'Gateway/Icons',
  component: () => (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: 2.5,
      }}
    >
      {Object.keys(Icons).map((icon, index) => {
        const Icon = Icons[icon as keyof typeof Icons];
        return (
          <Stack alignItems="center" key={index}>
            <Icon sx={{ width: 60, height: 60, mb: 1 }} />{' '}
            <Typography variant="caption">{icon}</Typography>
          </Stack>
        );
      })}
    </Box>
  ),

  tags: ['autodocs'],
} satisfies Meta<SvgIconProps>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  // render: (args: SvgIconProps) => <Icons. {...args} />
};
