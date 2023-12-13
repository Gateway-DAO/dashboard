/* eslint-disable @next/next/inline-script-id */
import type { Metadata } from 'next';
import Script from 'next/script';

import { currentEnv } from '@/utils/env';
import { Analytics } from '@vercel/analytics/react';

import Providers from './providers';

export const metadata: Metadata = {
  title: 'Gateway Network',
  description: 'Gateway Network - A new concept about web3',
  openGraph: {
    images: ['/social.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isTesnet = currentEnv() === 'testnet';
  return (
    <html lang="en">
      {/* <!-- Hotjar Tracking Code for Gateway Network --> */}
      {isTesnet && (
        <Script
          id="hotjar"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:3399024,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `,
          }}
        />
      )}
      {/* <!-- Google tag (gtag.js) --> */}
      {process.env.NEXT_PUBLIC_GTM_TAG && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTM_TAG}`}
          />
          <Script
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
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
