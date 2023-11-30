import { pda } from '@/locale/en/pda';
import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '@mui/material';

import { SharingCost } from './sharing-cost';

const meta: Meta<typeof SharingCost> = {
  title: 'Components/Sharing Cost',
  component: SharingCost,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SharingCost>;

export const Playground: Story = {
  args: {
    label: 'Label',
    value: '$ 0.02',
    chip: pda.share.free,
    helperText: pda.share.sharing_cost_helper,
  },
  render: (props) => (
    <Box
      sx={{
        width: 500,
        position: 'relative',
        height: 100,
      }}
    >
      <SharingCost
        label={props.label}
        value={props.value}
        chip={props.chip}
        helperText={props.helperText}
      />
    </Box>
  ),
};
