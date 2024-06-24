import type { Meta, StoryObj } from '@storybook/react';

import { PdaStatus } from '../../services/protocol-v3/types';
import PDACard from './pda-card';

const meta: Meta<typeof PDACard> = {
  title: 'Components/PDA Card',
  component: PDACard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PDACard>;

export const Playground: Story = {
  args: {
    name: 'PDA Card',
    href: '#',
    status: PdaStatus.Valid,
    userImage: 'https://picsum.photos/200',
    userName: 'Issuer Name',
  },
};
