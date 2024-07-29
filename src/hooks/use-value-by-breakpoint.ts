import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

type BreakpointValues<T> = {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
};

export default function useValueByBreakpoint<T>(
  values: BreakpointValues<T>
): T | undefined {
  const theme = useTheme();

  const isSm = useMediaQuery(theme.breakpoints.up('sm'));
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));
  const isXl = useMediaQuery(theme.breakpoints.up('xl'));

  const { xs, sm, md, lg, xl } = values;

  if (isXl) {
    return xl ?? lg ?? md ?? sm ?? xs;
  }
  if (isLg) {
    return lg ?? md ?? sm ?? xs;
  }
  if (isMd) {
    return md ?? sm ?? xs;
  }
  if (isSm) {
    return sm ?? xs;
  }
  return xs;
}

useValueByBreakpoint;
