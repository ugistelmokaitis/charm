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
import ArrowIcon from '../public/icons/arrowicon.svg';

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
    <div className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-15/95 bg-neutral-0/80 py-3 backdrop-blur-md firefox:bg-neutral-0 dark:border-neutral-80/95 dark:bg-neutral-100/80 dark:firefox:bg-neutral-100 md:py-5">
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
            {settings.data.headerSiteMap.map(({ label, link }, index) => (
              <div key={index} className="ml-2">
                <Button
                  href={docResolver(link)}
                  aria-label="Header Page Label"
                  variant="neutral"
                  className={` ${`ABCWhyteEdu-Medium hidden rounded-md py-[0.75rem] px-[0.75rem] font-[350] text-neutral-50 hover:bg-primary-25 dark:text-neutral-30 dark:hover:bg-neutral-80 md:flex`} ${
                    router.asPath === docResolver(link)
                      ? `font-medium  text-[#111827] dark:text-[#FFFFFF]`
                      : ''
                  }`}
                >
                  {label}
                </Button>
              </div>
            ))}
            <div className="inline-flex pr-[0.25rem]">
              <div>
                <Link
                  passHref
                  href={docResolver(settings.data.githubSourceLink)}
                >
                  <a
                    href={docResolver(settings.data.githubSourceLink)}
                    target="_blank"
                    aria-label="View Source Code"
                    rel="noopener noreferrer"
                    className="flex"
                  >
                    <Tippy
                      content="View Source Code"
                      className="text-cr1 font-FiraCode-Regular font-normal text-neutral-100 dark:text-neutral-0"
                    >
                      <div className="hidden select-none rounded-md py-[0.75rem] px-[0.75rem] hover:bg-primary-25 dark:hover:bg-neutral-80 xs:flex md:ml-12 lg:mr-4">
                        <Image
                          src={settings.data.githubSourceIcon.url ?? ''}
                          alt={settings.data.githubSourceIcon.alt ?? ''}
                          width={24}
                          height={24}
                          layout="fixed"
                          quality={100}
                          className="dark:brightness-0 dark:invert-[1]"
                        />
                      </div>
                    </Tippy>
                  </a>
                </Link>
              </div>

              <div className="hidden dark:flex">
                <Tippy
                  content="Appearance Light Mode"
                  className="text-cr1 font-FiraCode-Regular font-normal text-neutral-0"
                >
                  <div
                    className="justify-evenly rounded-md py-[0.75rem] px-[0.75rem] hover:bg-primary-25 dark:hover:bg-neutral-80 2xs:flex"
                    key="light"
                    onKeyDown={() => {
                      removeTheme();
                      setTheme('light');
                    }}
                    role="button"
                    aria-label="Appearance Light Mode"
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
              </div>

              <div className="flex dark:hidden">
                <Tippy
                  content="Appearance Dark Mode"
                  className="text-cr1 font-FiraCode-Regular font-normal text-neutral-100"
                >
                  <div
                    className="justify-evenly rounded-md py-[0.75rem] px-[0.75rem] hover:bg-primary-25 dark:hover:bg-neutral-80 2xs:flex"
                    onKeyDown={() => {
                      removeTheme();
                      setTheme('dark');
                    }}
                    role="button"
                    aria-label="Appearance Dark Mode"
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
                  href={`${docResolver(settings.data.headerPrimaryButtonLink)}`}
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
                color="#111287"
                size={30}
              />
            </div>
            <div className="ml-4 hidden dark:flex dark:lg:hidden">
              <Hamburger
                toggled={isOpen}
                toggle={setOpen}
                label="Show menu"
                color="#FFFFFF"
                size={30}
              />
            </div>
          </div>
        </div>
      </Container>
      {isOpen ? (
        <Container>
          <div className="pointer-events-auto absolute left-0 top-[4.5625rem] z-[59] flex w-full select-auto flex-col gap-3  border-b border-neutral-15/95 bg-neutral-0 transition-all firefox:bg-neutral-0 dark:border-neutral-80/95 dark:bg-neutral-100 lg:hidden">
            <div className="container mx-auto  px-6 pb-64">
              <div className="mt-6">
                {settings.data.hamburgerMenu.map(({ label, link }, index) => (
                  <div key={index}>
                    <Button
                      href={docResolver(link)}
                      variant="neutral"
                      className={` ${`ABCWhyteEdu-Book grid  grid-cols-2 rounded-md py-[0.75rem] px-[0.75rem] text-[20px] font-[350] leading-[29px] text-neutral-50 hover:bg-primary-25 dark:text-neutral-30  dark:hover:bg-neutral-80`} ${
                        router.asPath === docResolver(link)
                          ? `font-medium text-[#111827] dark:text-[#FFFFFF]`
                          : ''
                      }`}
                    >
                      {label}
                    </Button>
                  </div>
                ))}

                <div className="mt-10 inline-flex gap-4">
                  {settings.data.hamburgerSocialMedia.map(
                    ({ icon, link }, index) => (
                      <div
                        key={index}
                        className="gap-6 rounded-md py-[5px] px-[5px] hover:animate-pulse hover:bg-primary-25 dark:hover:bg-neutral-80 xs:py-[7px] xs:px-[7px]"
                      >
                        <Link passHref href={`${docResolver(link)}`}>
                          <a
                            href={docResolver(settings.data.githubSourceLink)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex"
                          >
                            <Image
                              src={icon.url ?? ''}
                              alt={icon.alt ?? ''}
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
                <div className="ABCWhyteEdu-Medium mt-5 text-[14px] font-[350] text-neutral-50 dark:text-neutral-30 xl:mt-0">
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
