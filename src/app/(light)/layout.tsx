/* eslint-disable @next/next/inline-script-id */
import type { Metadata } from 'next';
import Script from 'next/script';

import { currentEnv } from '@/utils/env';
import { Analytics } from '@vercel/analytics/react';
import sanitizeHtml from 'sanitize-html';

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
  const env = currentEnv;
  const isTesnetOrProd = env === 'testnet' || env === 'production';

  return (
    <html lang="en">
      {/* <!-- Hotjar Tracking Code for Gateway Network --> */}
      {isTesnetOrProd && (
        <Script
          id="hotjar"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(`
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:3399024,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `),
          }}
        />
      )}
      {/* <!-- Google tag (gtag.js) --> */}
      {process.env.NEXT_PUBLIC_GTM_TAG && (
        <>
          <Script
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-N32L27DH');
            `),
            }}
          />
          {/* <Script
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
          /> */}
        </>
      )}
      <Script
        dangerouslySetInnerHTML={{
          __html: `
        !function(){"use strict";!function(e,t){var n=e.amplitude||{_q:[],_iq:{}};if(n.invoked)e.console&&console.error&&console.error("Amplitude snippet has been loaded.");else{var r=function(e,t){e.prototype[t]=function(){return this._q.push({name:t,args:Array.prototype.slice.call(arguments,0)}),this}},s=function(e,t,n){return function(r){e._q.push({name:t,args:Array.prototype.slice.call(n,0),resolve:r})}},o=function(e,t,n){e[t]=function(){if(n)return{promise:new Promise(s(e,t,Array.prototype.slice.call(arguments)))}}},i=function(e){for(var t=0;t<m.length;t++)o(e,m[t],!1);for(var n=0;n<g.length;n++)o(e,g[n],!0)};n.invoked=!0;var u=t.createElement("script");u.type="text/javascript",u.integrity="sha384-x0ik2D45ZDEEEpYpEuDpmj05fY91P7EOZkgdKmq4dKL/ZAVcufJ+nULFtGn0HIZE",u.crossOrigin="anonymous",u.async=!0,u.src="https://cdn.amplitude.com/libs/analytics-browser-2.0.0-min.js.gz",u.onload=function(){e.amplitude.runQueuedFunctions||console.log("[Amplitude] Error: could not load SDK")};var a=t.getElementsByTagName("script")[0];a.parentNode.insertBefore(u,a);for(var c=function(){return this._q=[],this},p=["add","append","clearAll","prepend","set","setOnce","unset","preInsert","postInsert","remove","getUserProperties"],l=0;l<p.length;l++)r(c,p[l]);n.Identify=c;for(var d=function(){return this._q=[],this},f=["getEventProperties","setProductId","setQuantity","setPrice","setRevenue","setRevenueType","setEventProperties"],v=0;v<f.length;v++)r(d,f[v]);n.Revenue=d;var m=["getDeviceId","setDeviceId","getSessionId","setSessionId","getUserId","setUserId","setOptOut","setTransport","reset","extendSession"],g=["init","add","remove","track","logEvent","identify","groupIdentify","setGroup","revenue","flush"];i(n),n.createInstance=function(e){return n._iq[e]={_q:[]},i(n._iq[e]),n._iq[e]},e.amplitude=n}}(window,document)}();

amplitude.init('36683c62d8db3f0ff467212f18302fef');
        `,
        }}
      />
      <body>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
