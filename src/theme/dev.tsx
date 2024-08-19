'use client';
import { useEffect } from 'react';

import { useTheme } from '@mui/material';

export default function DevTheme() {
  const theme = useTheme();

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      process.env.NODE_ENV === 'development'
    ) {
      (window as any).theme = theme;
    }
  }, [theme]);

  return null;
}
