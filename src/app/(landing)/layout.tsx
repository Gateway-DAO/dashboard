import type { Metadata } from 'next';

import './styles/global.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Script from 'next/script';

import Main from './components/Main';
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
    <html lang="en" className="lenis lenis-smooth">
      {/* <!-- Google tag (gtag.js) --> */}
      {process.env.NEXT_PUBLIC_GTM_TAG && (
        <>
          <Script
            id="ga-landing"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${process.env.NEXT_PUBLIC_GTM_TAG}');
              `,
            }}
          />
        </>
      )}
      <body>
        <Main>
          <Providers>{children}</Providers>
        </Main>

        <SetSizes />
      </body>
    </html>
  );
}
