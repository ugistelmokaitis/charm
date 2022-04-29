import type { FC } from 'react';
import { PrismicLink, PrismicRichText } from '@prismicio/react';
import Image from 'next/image';
import type { SettingsProps } from '../types/settings';
import { docResolver } from '../utils/prismic';
import Container from './container';
import Divider from './divider';

type ISettings = {
  settings: SettingsProps;
};

const Footer: FC<ISettings> = ({ settings }) => (
  <div className="flex bg-neutral-0 pt-[8.25rem] selection:bg-primary-50 selection:text-neutral-100 dark:bg-neutral-100">
    <Container>
      <Divider />
      <div className="flex items-center justify-between pt-6 pb-20">
        <div className="font-charmRegular text-pSMRegular font-normal tracking-[0.02em]  text-neutral-30 dark:text-neutral-15">
          {settings.data.siteCredit}
        </div>
        <div className="flex">
          {settings.data.footerSitemap.map(({ pageLabel, pageLink }, index) => (
            <div key={index} className="mr-8">
              <PrismicLink field={pageLink}>
                <div className="font-ABCWhyteEdu_Medium text-pSMSemiBold font-semibold tracking-[0.02em] text-neutral-30 dark:text-neutral-15">
                  {pageLabel}
                </div>
              </PrismicLink>
            </div>
          ))}
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

export default Footer;
