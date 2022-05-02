import type { FC } from 'react';
import { PrismicLink, PrismicRichText } from '@prismicio/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
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
    <div className="flex bg-neutral-0 pt-[8.25rem] selection:bg-primary-50 selection:text-neutral-100 dark:bg-neutral-100">
      <Container>
        <Divider />
        <div className="flex items-center justify-between pt-6 pb-20">
          <div className="font-charmRegular text-pSMRegular font-normal tracking-[0.02em]  text-neutral-30 dark:text-neutral-15">
            {settings.data.siteCredit}
          </div>
          <div className="flex">
            {settings.data.footerSitemap.map(
              ({ pageLabel, pageLink }, index) => (
                <div key={index} className="ml-8">
                  <Button
                    href={docResolver(pageLink)}
                    variant="neutral"
                    className={` ${`bg-primary-25dark:bg-neutral-80 py-[0.75rem] px-[0.75rem] font-ABCWhyteEdu_Medium text-pSMSemiBold font-semibold tracking-[0.02em]  text-neutral-50 hover:bg-primary-25 dark:text-neutral-30 dark:hover:bg-neutral-80`} ${
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

          <div className="flex">
            {settings.data.footerSocialMedia.map(
              ({ socialMediaIcon, socialMediaLink }, index) => (
                <div key={index} className="pr-6 hover:animate-pulse">
                  <PrismicLink href={`${docResolver(socialMediaLink)}`}>
                    <Image
                      src={socialMediaIcon.url ?? ''}
                      alt={socialMediaIcon.alt ?? ''}
                      width={24}
                      height={24}
                      layout="fixed"
                      quality={100}
                    />
                  </PrismicLink>
                </div>
              )
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
