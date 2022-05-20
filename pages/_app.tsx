import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { PrismicProvider } from '@prismicio/react';
import type { FC } from 'react';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import '../styles/tippy.css';
import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { client, linkResolver } from '../utils/prismic';
import ExternalLinkComponent from '../components/externalLink';
import InternalLinkComponent from '../components/internalLink';
import richTextComponents from '../components/richTextComponents';
import * as gtag from '../utils/gtag';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        dangerouslySetInnerHTML={{
          // eslint-disable-next-line @typescript-eslint/naming-convention
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag("js", new Date());
            gtag("config", "${gtag.GA_TRACKING_ID}", {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />

        <meta name="application-name" content="Ugi Stelmokaitis" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Ugi Stelmokaitis" />

        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#111827" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#111827" />
        <link rel="manifest" href="/manifest.json" />

        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#111827" />
      </Head>
      <PrismicProvider
        linkResolver={linkResolver}
        internalLinkComponent={InternalLinkComponent}
        externalLinkComponent={ExternalLinkComponent}
        client={client}
        richTextComponents={richTextComponents}
      >
        <Component {...pageProps} />
      </PrismicProvider>
      <Toaster
        toastOptions={{
          position: 'bottom-right',
        }}
      />
    </>
  );
};

export default MyApp;
