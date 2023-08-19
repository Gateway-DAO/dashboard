import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Stack } from '@mui/material';

import Chip from './Chip.component';

const meta: Meta<typeof Chip> = {
  title: 'Example/Chip',
  component: Chip,
  parameters: {
    layout: "centered"
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Playground: Story = {
  args: {
    label: 'Click me!',
  },
};

export const Variants: Story = {
  render: () => (
    <Stack spacing={2} maxWidth={300}>
      <Chip variant="filled" label="Filled Chip" />
      <Chip variant="outlined" label="Outlined Chip" />
    </Stack>
  ),
};

export const Colors: Story = {
  render: () => (
    <Stack spacing={2} maxWidth={300}>
      <Chip variant="filled" label="Primary" />
      <Chip variant="filled" color="secondary" label="Secondary" />
      <Chip variant="filled" color="success" label="Success" />
      <Chip variant="filled" color="error" label="Error" />
    </Stack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack spacing={2} maxWidth={300}>
      <Chip variant="filled" size="small" label="Small" />
      <Chip variant="filled" size="medium" label="Medium" />
      <Chip variant="filled" label="Large" />
    </Stack>
  ),
};
