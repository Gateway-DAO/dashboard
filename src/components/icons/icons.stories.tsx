import type { Meta, StoryObj } from '@storybook/react';

import { SvgIconProps } from '@mui/material';

import DataFilledIcon from './data-filled';
import DataOutlinedIcon from './data-outlined';
import DataProofFilledIcon from './data-proof-filled';
import DataProofOutlinedIcon from './data-proof-outlined';
import DataRequestFilledIcon from './data-request-filled';
import DataRequestOutlinedIcon from './data-request-outlined';
import GatewayIcon from './gateway';
import GatewayBrokenIcon from './gateway-broken';
import GatewaySquaredIcon from './gateway-squared';
import PassFilledIcon from './pass-filled';
import SolanaIcon from './solana';
import VerifiedFilledIcon from './verified-filled';


const meta = {
  title: 'Gateway/Icons',
  component: () => <>
    <DataProofOutlinedIcon />
    <DataProofFilledIcon />
    <GatewaySquaredIcon />
    <GatewayIcon />
    <GatewayBrokenIcon />
    <SolanaIcon />
    <DataRequestFilledIcon />
    <DataRequestOutlinedIcon />
    <DataFilledIcon />
    <DataOutlinedIcon />
    <VerifiedFilledIcon />
    <PassFilledIcon />
  </>,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<SvgIconProps>;

type Story = StoryObj<typeof meta>;

export default meta;


export const Default: Story = {
  // render: (args: SvgIconProps) => <Icons. {...args} />
}
