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
      height: 670,
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
        titleTemplate={`%s - ${name} - Software Developer`}
        title={title ?? ''}
        description={description ?? ''}
        canonical={url}
        openGraph={{
          url,
          title: title ?? '',
          description: description ?? '',
          images,
          site_name: name,
          type: '- Software Developer',
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
      {/* <SocialProfileJsonLd
        name={name}
        type="Organization"
        url={process.env.NEXT_PUBLIC_SITE_URL ?? ''}

        sameAs={settings.social_header.map((social) =>
          docResolver(social.social_media_link)
        )}
      /> */}

      <Header settings={settings} />
      <div>
        {/* <AnimatedCursor
          innerSize={8}
          outerSize={9}
          color="21, 91, 226"
          outerAlpha={0.2}
          innerScale={0.7}
          outerScale={9}
          trailingSpeed={8}
        /> */}
      </div>
      {children}
      <Footer settings={settings} />
    </>
  );
};

export default Layout;
