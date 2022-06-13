import type { ReactNode, FC } from 'react';
import { NextSeo, SocialProfileJsonLd } from 'next-seo';
import { useRouter } from 'next/router';
import type { ImageField, KeyTextField } from '@prismicio/types';
import type { SettingsProps } from '../types/settings';
import { docResolver } from '../utils/prismic';
import Header from './header';
import Footer from './footer';

type LayoutProps = {
  children: ReactNode;
  title: KeyTextField;
  description: KeyTextField;
  image?: ImageField;
  settings: SettingsProps;
};

const name = 'Ugi Stelmokaitis';
const username = 'ugistelmokaitis';

const Layout: FC<LayoutProps> = ({
  children,
  title,
  description,
  image,
  settings,
}) => {
  const { asPath } = useRouter();
  const url = `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}${asPath}`;
  const images = [
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/cover.png`,
      width: 1200,
      height: 630,
      alt: name,
    },
  ];

  if (image?.url) {
    images.unshift({
      url: image.url,
      width: image.dimensions.width,
      height: image.dimensions.height,
      alt: name,
    });
  }

  return (
    <>
      <NextSeo
        titleTemplate={`%s — ${name}`}
        title={title ?? ''}
        description={description ?? ''}
        canonical={url}
        openGraph={{
          url,
          title: title ?? '',
          description: description ?? '',
          images,
          site_name: name,
          type: '| Software Developer',
          profile: {
            username,
          },
        }}
        twitter={{
          handle: `@${username}`,
          site: `@${username}`,
          cardType: 'summary_large_image',
        }}
      />
      <SocialProfileJsonLd
        name={name}
        type="Organization"
        url={process.env.NEXT_PUBLIC_SITE_URL ?? ''}
        sameAs={settings.data.footerSocialMedia.map(({ link }) =>
          docResolver(link)
        )}
      />
      <div className="selection:bg-primary-50 selection:text-neutral-100 dark:bg-neutral-100">
        <Header settings={settings} />
        {children}
        <Footer settings={settings} />
      </div>
    </>
  );
};

export default Layout;
