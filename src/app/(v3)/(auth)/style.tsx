'use client';
import { GlobalStyles } from '@mui/material';

export const style = (
  <GlobalStyles
    styles={(theme) => ({
      [theme.breakpoints.up('md')]: {
        body: {
          backgroundColor: theme.palette.primary.main,
        },
      },
    })}
  />
);
