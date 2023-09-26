'use client';

import { useWindowSize } from '@react-hookz/web';

import { useTheme } from '@mui/material';

export default function useBreakpoints() {
  const { width } = useWindowSize();
  const theme = useTheme();

  const isMobile = width < theme.breakpoints.values.sm;
  const isTablet =
    width >= theme.breakpoints.values.sm && width < theme.breakpoints.values.lg;
  const isDesktop = width >= theme.breakpoints.values.lg;

  return { isMobile, isTablet, isDesktop };
}
