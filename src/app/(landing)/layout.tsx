import type { Metadata } from 'next';

import './styles/global.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Main from './components/main';
import SetSizes from './components/set-sizes';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Gateway Network',
  description: 'Gateway Network - A new concept about web3',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Main>
          <Providers>{children}</Providers>
        </Main>

        <SetSizes />
      </body>
    </html>
  );
}
