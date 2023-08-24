import React from 'react';

import type { Meta, StoryObj, } from '@storybook/react';


import { CredentialStatus } from "../../services/protocol/types";
import PDACard from "./pda-card"

const meta: Meta<typeof PDACard> = {
  title: 'Components/PDA Card',
  component: PDACard,
  parameters: {
    layout: "centered",
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PDACard>;

export const Playground: Story = {
  args: {
    name: 'PDA Card',
    href: "#",
    status: CredentialStatus.Valid,
    issuerImage: "https://picsum.photos/200",
    issuerName: "Issuer Name",
  },
};
