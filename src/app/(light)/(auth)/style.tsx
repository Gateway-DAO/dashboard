'use client';
import { GlobalStyles } from '@mui/material';

export const GlobalStyle = () => (
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
