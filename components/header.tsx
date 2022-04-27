import { PrismicLink, PrismicRichText } from '@prismicio/react';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { asText } from '@prismicio/helpers';
import { useRouter } from 'next/router';
import { useLocalStorageValue } from '@react-hookz/web';
import Headroom from 'react-headroom';
import type { SettingsProps } from '../types/settings';
import { docResolver } from '../utils/prismic';
import ArrowIcon from '../public/icons/arrowIcon.svg';

import Container from './container';
import Button from './button';

type ISettings = {
  settings: SettingsProps;
};

const Header: FC<ISettings> = ({ settings }) => {
  const [theme, setTheme, removeTheme] = useLocalStorageValue<
    string | undefined
  >('theme', undefined);

  useEffect(() => {
    if (
      theme === 'dark' ||
      (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  console.log(theme);

  return (
    <Headroom>
      <div className="flex bg-neutral-0 selection:bg-primary-50 selection:text-neutral-100 dark:bg-neutral-100">
        <Container>
          <div className="flex items-center justify-between pb-6 pt-6">
            <PrismicLink href={`${docResolver(settings.data.headerHeroLink)}`}>
              <Image
                src="/icons/logo.svg"
                alt="logo"
                width={196}
                height={32}
                layout="fixed"
                quality={100}
              />
            </PrismicLink>
            <div className="flex items-center justify-center">
              {settings.data.headerSiteMap.map(
                ({ headerPageLabel, headerPageLink }, index) => (
                  <div key={index} className="ml-8">
                    <PrismicLink field={headerPageLink}>
                      <div className="text-neutral-50">
                        <div className="font-ABCWhyteEdu_Medium text-pSMSemiBold font-semibold tracking-[0.02em] text-neutral-50">
                          {asText(headerPageLabel)}
                        </div>
                      </div>
                    </PrismicLink>
                  </div>
                )
              )}
              <div className="ml-8 hover:bg-primary-75">
                <PrismicLink
                  href={`${docResolver(settings.data.githubSourceLink)}`}
                >
                  <Image
                    src="/icons/github.svg"
                    alt="github logo"
                    width={24}
                    height={24}
                    layout="fixed"
                    quality={100}
                  />
                </PrismicLink>
              </div>

              <div className="ml-8 hover:bg-primary-50">
                <div
                  className="hidden dark:block"
                  onClick={() => {
                    removeTheme();
                    setTheme('light');
                  }}
                >
                  <Image
                    src="/icons/lightmode.svg"
                    alt="github logo"
                    width={24}
                    height={24}
                    layout="fixed"
                    quality={100}
                  />
                </div>
                <div
                  className="block dark:hidden"
                  onClick={() => {
                    removeTheme();
                    setTheme('dark');
                  }}
                >
                  <Image
                    src="/icons/darkmode.svg"
                    alt="github logo"
                    width={24}
                    height={24}
                    layout="fixed"
                    quality={100}
                  />
                </div>
              </div>
              <div className="ml-12">
                <Button
                  href={`${docResolver(settings.data.headerPrimaryButtonLink)}`}
                  variant="secondary"
                >
                  {asText(settings.data.headerPrimaryButtonLabel)}
                  <ArrowIcon className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Headroom>
  );
};

export default Header;
