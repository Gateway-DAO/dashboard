import { PropsWithChildren } from 'react';

import { ThemeProvider } from '@/theme';

export default function Providers({ children }: PropsWithChildren) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
