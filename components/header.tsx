import { PrismicLink } from '@prismicio/react';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useLocalStorageValue } from '@react-hookz/web';
import Tippy from '@tippyjs/react';
import Link from 'next/link';
import { Spiral as Hamburger } from 'hamburger-react';
import type { SettingsProps } from '../types/settings';
import { docResolver } from '../utils/prismic';
import ArrowIcon from '../public/icons/arrowIcon.svg';

import Container from './container';
import Button from './button';

type ISettings = {
  settings: SettingsProps;
};

const Header: FC<ISettings> = ({ settings }) => {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    document.body.style.width = isOpen ? '100vw' : 'unset';
  }, [isOpen]);

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
    <div className="flex bg-neutral-0 selection:bg-primary-50 selection:text-neutral-100 dark:bg-neutral-100">
      <div className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-15/95 bg-neutral-0/80 py-3 backdrop-blur-md dark:border-neutral-80/95 dark:bg-neutral-100/80  md:py-5">
        <Container>
          <div className="flex items-center justify-between ">
            <PrismicLink field={settings.data.headerHeroLink}>
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
            <div className="flex items-center justify-center ">
              {settings.data.headerSiteMap.map(
                ({ headerPageLabel, headerPageLink }, index) => (
                  <div key={index} className="ml-2">
                    <Button
                      href={docResolver(headerPageLink)}
                      variant="neutral"
                      className={` ${`hidden rounded-md py-[0.75rem] px-[0.75rem] font-ABCWhyteEdu_Medium text-pSMSemiBold font-semibold text-neutral-50 hover:bg-primary-25 dark:text-neutral-30 dark:hover:bg-neutral-80 md:flex`} ${
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
              <div className="inline-flex pr-[0.25rem]">
                <Tippy
                  content="View Github Profile"
                  className="font-codeRegular font-FiraCode_Regular text-codeMDRegular text-neutral-100"
                >
                  <div className="hidden rounded-md py-[0.75rem] px-[0.75rem] hover:bg-primary-25 dark:hover:bg-neutral-80 xs:flex md:ml-12 lg:mr-4">
                    <div>
                      <Link
                        passHref
                        href={docResolver(settings.data.githubSourceLink)}
                      >
                        <a
                          href={docResolver(settings.data.githubSourceLink)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex"
                        >
                          <Image
                            src={settings.data.githubSourceIcon.url ?? ''}
                            alt={settings.data.githubSourceIcon.alt ?? ''}
                            width={24}
                            height={24}
                            layout="fixed"
                            quality={100}
                            className="dark:brightness-0 dark:invert-[1]"
                          />
                        </a>
                      </Link>
                    </div>
                  </div>
                </Tippy>

                <div className="hidden justify-evenly rounded-md py-[0.75rem] px-[0.75rem] hover:bg-primary-25 dark:hover:bg-neutral-80 2xs:flex ">
                  <Tippy
                    content="Appearance Light Mode"
                    className="font-codeRegular mt-[0.4375rem] font-FiraCode_Regular text-codeMDRegular text-neutral-100"
                  >
                    <div
                      className="hidden dark:flex"
                      key="light"
                      onKeyDown={() => {
                        removeTheme();
                        setTheme('light');
                      }}
                      role="button"
                      tabIndex={0}
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
                    className="font-codeRegular mt-[0.4375rem] font-FiraCode_Regular text-codeMDRegular text-neutral-100 "
                  >
                    <div
                      className="flex dark:hidden"
                      onKeyDown={() => {
                        removeTheme();
                        setTheme('dark');
                      }}
                      role="button"
                      tabIndex={0}
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

                <div className="ml-12 hidden lg:flex">
                  <Button
                    href={`${docResolver(
                      settings.data.headerPrimaryButtonLink
                    )}`}
                    variant="primary"
                  >
                    {settings.data.headerPrimaryButtonLabel}
                    <ArrowIcon className="ml-2" />
                  </Button>
                </div>
              </div>

              <div className="ml-4 flex dark:hidden lg:hidden">
                <Hamburger
                  toggled={isOpen}
                  toggle={setOpen}
                  label="Show menu"
                  color="black "
                />
              </div>
              <div className="ml-4 hidden dark:flex dark:lg:hidden">
                <Hamburger
                  toggled={isOpen}
                  toggle={setOpen}
                  label="Show menu"
                  color="white"
                />
              </div>
            </div>
          </div>
        </Container>
      </div>
      {isOpen ? (
        <Container>
          <div className="pointer-events-auto absolute left-0 top-[4.5625rem] z-[59] flex w-full select-auto flex-col gap-3  border-b border-neutral-15/95 bg-neutral-0/80 opacity-100 backdrop-blur-md transition-all dark:border-neutral-80/95 dark:bg-neutral-100/80 lg:hidden">
            <div className="container mx-auto  px-6 pb-64">
              <div className="mt-6">
                {settings.data.footerSitemap.map(
                  ({ pageLabel, pageLink }, index) => (
                    <div key={index}>
                      <Button
                        href={docResolver(pageLink)}
                        variant="neutral"
                        className={` ${`grid grid-cols-2 rounded-md py-[0.75rem] px-[0.75rem] font-ABCWhyteEdu_Medium text-pSMSemiBold font-semibold text-neutral-50  hover:bg-primary-25  dark:text-neutral-30 dark:hover:bg-neutral-80`} ${
                          router.asPath === docResolver(pageLink)
                            ? `text-[#111827]  dark:text-[#FFFFFF]`
                            : ''
                        }`}
                      >
                        {pageLabel}
                      </Button>
                    </div>
                  )
                )}

                <div className="mt-5 inline-flex gap-2">
                  {settings.data.footerSocialMedia.map(
                    ({ socialMediaIcon, socialMediaLink }, index) => (
                      <div
                        key={index}
                        className="gap-6 rounded-md py-[5px] px-[5px] hover:animate-pulse hover:bg-primary-25 dark:hover:bg-neutral-80 xs:py-[7px] xs:px-[7px]"
                      >
                        <Link passHref href={`${docResolver(socialMediaLink)}`}>
                          <a
                            href={docResolver(settings.data.githubSourceLink)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex"
                          >
                            <Image
                              src={socialMediaIcon.url ?? ''}
                              alt={socialMediaIcon.alt ?? ''}
                              width={24}
                              height={24}
                              layout="fixed"
                              quality={100}
                              className="dark:brightness-0 dark:invert-[1]"
                            />
                          </a>
                        </Link>
                      </div>
                    )
                  )}
                </div>
                <div className="font-charmRegular mt-5 text-pSMRegular font-normal text-neutral-30 dark:text-neutral-15 xl:mt-0">
                  {settings.data.siteCredit}
                </div>
              </div>
            </div>
          </div>
        </Container>
      ) : (
        ''
      )}
    </div>
  );
};

export default Header;
