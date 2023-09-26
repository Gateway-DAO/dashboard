import type { Meta, StoryObj } from '@storybook/react';

import { SvgIconProps } from '@mui/material';

import DataOutlinedIcon from './data-outlined';
import DataProofOutlinedIcon from './data-proof-outlined';
import DataRequestOutlinedIcon from './data-request-outlined';
import GatewayIcon from './gateway';
import GatewayBrokenIcon from './gateway-broken';
import GatewaySquaredIcon from './gateway-squared';
import PassFilledIcon from './pass-filled';
import SolanaIcon from './solana';
import VerifiedFilledIcon from './verified-filled';

const meta = {
  title: 'Gateway/Icons',
  component: () => (
    <>
      <DataOutlinedIcon />
      <DataProofOutlinedIcon />
      <DataRequestOutlinedIcon />
      <VerifiedFilledIcon />
      <PassFilledIcon />
      <GatewaySquaredIcon />
      <GatewayIcon />
      <GatewayBrokenIcon />
      <SolanaIcon />
    </>
  ),
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<SvgIconProps>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  // render: (args: SvgIconProps) => <Icons. {...args} />
};
