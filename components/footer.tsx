import type { FC } from 'react';
import { PrismicLink, PrismicRichText } from '@prismicio/react';
import Image from 'next/image';
import { asText } from '@prismicio/helpers';
import type { SettingsProps } from '../types/settings';
import { docResolver } from '../utils/prismic';
import Container from './container';
import Divider from './divider';

type ISettings = {
  settings: SettingsProps;
};

const Footer: FC<ISettings> = ({ settings }) => (
  <div className="flex bg-neutral-0 selection:bg-primary-50 selection:text-neutral-100">
    <Container>
      <Divider />
      <div className="flex items-center justify-between pt-6 pb-20">
        <div className="font-charmRegular text-lightGrey-100 text-pSMRegular font-normal  tracking-[0.02em]">
          {asText(settings.data.siteCredit)}
        </div>
        <div className="flex">
          {settings.data.footerSitemap.map(({ pageLabel, pageLink }, index) => (
            <div key={index} className="mr-8">
              <PrismicLink field={pageLink}>
                <div className="text-lightGrey-100">
                  <PrismicRichText field={pageLabel} />
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
