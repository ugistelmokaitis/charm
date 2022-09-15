import type { FC } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import type { SettingsProps } from '../types/settings';
import { docResolver } from '../utils/prismic';
import Container from './container';
import Divider from './divider';
import Button from './button';

type ISettings = {
  settings: SettingsProps;
};

const today = new Date();

const Footer: FC<ISettings> = ({ settings }) => {
  const router = useRouter();

  return (
    <div className="bg-neutral-0 pt-[6rem] dark:bg-neutral-100 lg:pt-40 ">
      <Container>
        <div className="block">
          <div className="items-center justify-between pb-8 lg:flex">
            <div className="grid grid-cols-2 1xs:grid-cols-3 sm:grid-cols-4 lg:flex lg:items-center lg:justify-center">
              {settings.data.footerSitemap.map(({ label, link }, index) => (
                <div key={index} className="xl:gap-8">
                  <Button
                    href={docResolver(link)}
                    variant="neutral"
                    className={` ${`ABCWhyteEdu-Medium grid grid-cols-1 rounded-md py-[0.75rem] px-[0.75rem] font-[350] text-neutral-65 hover:bg-primary-25  dark:text-neutral-30  dark:hover:bg-neutral-80 xl:flex`} ${
                      router.asPath === docResolver(link)
                        ? `font-medium  text-[#111827] dark:text-[#FFFFFF]`
                        : ''
                    }`}
                  >
                    {label}
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-start gap-4 pt-8 lg:pt-0">
              {settings.data.footerSocialMedia.map(({ icon, link }, index) => (
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
              ))}
            </div>
          </div>
          <Divider />
          <div className="mt-8 items-center justify-between pb-12 lg:flex">
            <div className="ABCWhyteEdu-Medium font-[350] text-neutral-65  dark:text-neutral-30 xl:mt-0">
              © {today.getFullYear()} {settings.data.siteCredit}
            </div>
            <div className="flex items-center pt-6 lg:pt-0">
              {settings.data.footerBottomRightSitemap.map(
                ({ label, link }, index) => (
                  <div key={index} className="pr-4 xl:gap-8">
                    <Button
                      href={docResolver(link)}
                      variant="neutral"
                      className={` ${`ABCWhyteEdu-Medium grid grid-cols-1 rounded-md py-[0.75rem] px-[0.75rem] font-[350] text-neutral-65 hover:bg-primary-25  dark:text-neutral-30  dark:hover:bg-neutral-80 xl:flex`} ${
                        router.asPath === docResolver(link)
                          ? `font-medium  text-[#111827] dark:text-[#FFFFFF]`
                          : ''
                      }`}
                    >
                      {label}
                    </Button>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
