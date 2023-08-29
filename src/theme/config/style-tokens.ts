import { BreakpointsValue } from '../types';

/**
 * Reusable style tokens for responsiveness acorss the website.
 */

type BreakpointsValues = Required<Pick<BreakpointsValue<number>, 'xs' | 'md' | 'lg'>>;

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
