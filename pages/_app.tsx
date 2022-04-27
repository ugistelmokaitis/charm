import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { PrismicProvider } from '@prismicio/react';
import type { FC } from 'react';
import { Toaster } from 'react-hot-toast';

import { client, linkResolver } from '../utils/prismic';
import ExternalLinkComponent from '../components/externalLink';
import InternalLinkComponent from '../components/internalLink';
import richTextComponents from '../components/richTextComponents';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
  <>
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

export default MyApp;
