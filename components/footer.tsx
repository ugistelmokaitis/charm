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

const Footer: FC<ISettings> = ({ settings }) => {
  const router = useRouter();

  return (
    <div className="bg-neutral-0 pt-52 selection:bg-primary-50 selection:text-neutral-100 dark:bg-neutral-100 ">
      <Container>
        <Divider />

        <div className="items-center justify-between pt-6 pb-12 xl:flex">
          <div className="mt-6 mb-6 grid grid-cols-3 xl:flex">
            {settings.data.footerSitemap.map(
              ({ pageLabel, pageLink }, index) => (
                <div key={index} className="xl:m-1  xl:gap-8">
                  <Button
                    href={docResolver(pageLink)}
                    variant="neutral"
                    className={` ${`grid grid-cols-1 rounded-md py-[0.75rem] px-[0.75rem] font-ABCWhyteEdu_Medium text-pSMSemiBold font-semibold text-neutral-50 hover:bg-primary-25  dark:text-neutral-30  dark:hover:bg-neutral-80 xl:flex`} ${
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
          </div>

          <div className="inline-flex gap-2">
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
          <div className="font-charmRegular mt-6 text-pSMRegular font-normal text-neutral-30 dark:text-neutral-15 xl:mt-0">
            {settings.data.siteCredit}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
