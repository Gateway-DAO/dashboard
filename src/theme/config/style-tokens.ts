import { SxProps } from '@mui/system';

import { BreakpointsValue } from '../types';

/**
 * Reusable style tokens for responsiveness acorss the website.
 */

type BreakpointsValues = Required<
  Pick<BreakpointsValue<number>, 'xs' | 'md' | 'lg'>
>;

export const WIDTH_CENTERED = {
  maxWidth: 550,
  width: '100%',
  mx: 'auto',
} satisfies SxProps;

export const CONTAINER_PX: BreakpointsValues = {
  xs: 3,
  md: 4,
  lg: 6,
};
export const NEGATIVE_CONTAINER_PX: BreakpointsValues = {
  xs: -3,
  md: -4,
  lg: -6,
};

export const CONTAINER_PT = {
  xs: 2,
  lg: 5,
};

export const CONTAINER_PB = {
  xs: 10,
  lg: 4,
};
export const NEGATIVE_CONTAINER_PT = {
  xs: -2,
  lg: -5,
};

export const NEGATIVE_CONTAINER_PB = {
  xs: -10,
  lg: -4,
};
