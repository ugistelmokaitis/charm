import { PrismicLink, PrismicRichText } from '@prismicio/react';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { asText } from '@prismicio/helpers';
import { useRouter } from 'next/router';
import { useLocalStorageValue } from '@react-hookz/web';
import Headroom from 'react-headroom';
import Tippy from '@tippyjs/react';
import type { SettingsProps } from '../types/settings';
import { docResolver } from '../utils/prismic';
import ArrowIcon from '../public/icons/arrowIcon.svg';
import 'tippy.js/dist/tippy.css';
import ToolTipComponent from './tooltip';

import Container from './container';
import Button from './button';

type ISettings = {
  settings: SettingsProps;
};

const Header: FC<ISettings> = ({ settings }) => {
  const router = useRouter();
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

  return (
    <Headroom>
      <div className="flex bg-neutral-0 selection:bg-primary-50 selection:text-neutral-100 dark:bg-neutral-100">
        <Container>
          <div className="flex items-center justify-between pb-6 pt-6">
            <PrismicLink document={settings.data.headerHeroLink}>
              <Image
                src={settings.data.headerHeroLogo.url ?? ''}
                alt={settings.data.headerHeroLogo.alt ?? ''}
                width={196}
                height={32}
                layout="fixed"
                quality={100}
                className="dark:brightness-0 dark:invert-[1]"
              />
            </PrismicLink>
            <div className="flex items-center justify-center">
              {settings.data.headerSiteMap.map(
                ({ headerPageLabel, headerPageLink }, index) => (
                  <div key={index} className="ml-8">
                    <Button
                      href={docResolver(headerPageLink)}
                      variant="neutral"
                      className={` ${`bg-primary-25dark:bg-neutral-80 rounded-md py-[0.75rem] px-[0.75rem] font-ABCWhyteEdu_Medium text-pSMSemiBold font-semibold tracking-[0.02em]  text-neutral-50 hover:bg-primary-25 dark:text-neutral-30 dark:hover:bg-neutral-80`} ${
                        router.asPath === docResolver(headerPageLink)
                          ? `text-[#111827]  dark:text-[#FFFFFF]`
                          : ''
                      }`}
                    >
                      {headerPageLabel}
                    </Button>
                  </div>
                )
              )}
              <div className="ml-4 rounded-md py-[7px] px-[7px] hover:bg-primary-25 dark:hover:bg-neutral-80">
                <Tippy
                  content="View Github Profile"
                  className="font-codeRegular mt-[0.375rem] bg-success-100 font-FiraCode_Regular text-codeMDRegular text-neutral-100"
                >
                  <div>
                    <PrismicLink document={settings.data.githubSourceLink}>
                      <Image
                        src={settings.data.githubSourceIcon.url ?? ''}
                        alt={settings.data.githubSourceIcon.alt ?? ''}
                        width={24}
                        height={24}
                        layout="fixed"
                        quality={100}
                        className="dark:brightness-0 dark:invert-[1]"
                      />
                    </PrismicLink>
                  </div>
                </Tippy>
              </div>

              <div className=" ml-4 rounded-md border-2 border-[#FFF] py-[7px] px-[7px] hover:bg-primary-25 active:border-[#C7D8FF] dark:hover:bg-neutral-80">
                <Tippy
                  content="Appearance Light Mode"
                  className="font-codeRegular mt-[0.375rem] font-FiraCode_Regular text-codeMDRegular text-neutral-100"
                >
                  <div
                    className="hidden dark:block"
                    onClick={() => {
                      removeTheme();
                      setTheme('light');
                    }}
                  >
                    <Image
                      src={settings.data.lightModeIcon.url ?? ''}
                      alt={settings.data.lightModeIcon.alt ?? ''}
                      width={24}
                      height={24}
                      layout="fixed"
                      quality={100}
                    />
                  </div>
                </Tippy>

                <Tippy
                  content="Appearance Dark Mode"
                  className="font-codeRegular mt-[0.375rem] font-FiraCode_Regular text-codeMDRegular text-neutral-100"
                >
                  <div
                    className="block dark:hidden"
                    onClick={() => {
                      removeTheme();
                      setTheme('dark');
                    }}
                  >
                    <Image
                      src={settings.data.darkModeIcon.url ?? ''}
                      alt={settings.data.darkModeIcon.alt ?? ''}
                      width={24}
                      height={24}
                      layout="fixed"
                      quality={100}
                    />
                  </div>
                </Tippy>
              </div>
              <div className="ml-12">
                <Button
                  href={`${docResolver(settings.data.headerPrimaryButtonLink)}`}
                  variant="primary"
                >
                  {settings.data.headerPrimaryButtonLabel}
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
