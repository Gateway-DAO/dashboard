import './styles/global.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import type { Metadata } from 'next';
import Script from 'next/script';

import DOMPurify from 'isomorphic-dompurify';

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
  const gaLandingScript = DOMPurify.sanitize(`
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-N32L27DH');
`);
  return (
    <html lang="en" className="lenis lenis-smooth">
      {/* <!-- Google tag (gtag.js) --> */}
      {process.env.NEXT_PUBLIC_GTM_TAG && (
        <>
          <Script
            strategy="afterInteractive"
            id="ga-landing"
            dangerouslySetInnerHTML={{
              __html: gaLandingScript,
            }}
          />
          {/* <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTM_TAG}`}
          />
          <Script
            strategy="afterInteractive"
            id="ga-landing"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${process.env.NEXT_PUBLIC_GTM_TAG}');
              `,
            }}
          /> */}
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
