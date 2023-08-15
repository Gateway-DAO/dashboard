'use client';
import { useServerInsertedHTML } from 'next/navigation';
import { PropsWithChildren, useEffect, useState } from 'react';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

import { GlobalStyles } from './global-styles';
import { theme } from './theme';

// This implementation is from emotion-js
// https://github.com/emotion-js/emotion/issues/2928#issuecomment-1319747902
type Props = {
  withGlobalStyles?: boolean;
};

export function ThemeProvider({
  children,
  withGlobalStyles = true,
}: PropsWithChildren<Props>) {

  const [{ cache, flush }] = useState(() => {
    const cache = createCache({ key: 'gtw' });
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = '';
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      (window as any).theme = theme;
    }
  }, []);

  return (
    <CacheProvider value={cache}>
      <MUIThemeProvider theme={theme}>
        {withGlobalStyles && <GlobalStyles />}
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </CacheProvider>
  );
}
