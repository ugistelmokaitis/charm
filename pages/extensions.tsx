import type { GetStaticProps } from 'next';
import type { FC } from 'react';
import { PrismicLink, PrismicRichText } from '@prismicio/react';
import { asText } from '@prismicio/helpers';
import Image from 'next/image';
import Layout from '../components/layout';
import { getPage } from '../utils/prismic';
import type { ExtensionsProps } from '../types/extensions';
import type { SettingsProps } from '../types/settings';
import Container from '../components/container';
import richTextComponents from '../components/richTextComponents';
import SocialLinkIcon from '../public/icons/socialLinkIcon.svg';
import Divider from '../components/divider';

type IExtensions = {
  data: ExtensionsProps['data'];
  settings: SettingsProps;
};

const Extensions: FC<IExtensions> = ({ data, settings }) => (
  <Layout title="" description="" settings={settings}>
    <div className="flex bg-neutral-0 selection:bg-primary-50 selection:text-neutral-100 dark:bg-neutral-100">
      <Container>
        <div className="grid-starts-1 text-white-100 gap-16 pt-56 md:grid-cols-12 md:gap-8 lg:grid">
          <div className="col-span-6">
            <PrismicRichText field={data.introTitle} />
            <div className="mt-20 mb-20 font-ABCWhyteEdu_Regular text-pSMRegular font-normal tracking-[0.02em] text-neutral-100 dark:text-neutral-0 sm:text-pLGRegular xl:mt-28 xl:mb-28">
              {data.introDescription}
            </div>
            <div className="font-codeRegular font-FiraCode_Regular text-codeMDRegular text-primary-100 dark:text-blue-100">
              {data.extensionsTitle}
            </div>
            {data.extentions.map(
              ({ extentionDescription, extentionTitle }, index) => (
                <>
                  <div
                    key={index}
                    className="mt-6 mb-4 font-ABCWhyteEdu_Medium text-pMDSemiBold font-normal tracking-[0.02em] text-neutral-100 dark:text-neutral-0 sm:text-pLGSemiBold"
                  >
                    {extentionTitle}
                  </div>
                  <div className="pb-6 font-ABCWhyteEdu_Regular text-pSMRegular font-normal tracking-[0.02em] text-neutral-65 dark:text-neutral-15 sm:text-pMDRegular">
                    {extentionDescription}
                  </div>
                </>
              )
            )}
          </div>
          <div className="col-span-4 col-start-10 max-w-[20rem] pt-14 md:relative md:col-start-9 lg:pt-0 xl:col-span-3 xl:col-start-10 xl:max-w-full">
            <div className="top-[6.5625rem] rounded-[1.25rem] border-[0.03125rem] border-neutral-30 bg-primary-5 py-8 px-8 dark:border-neutral-15 dark:bg-neutral-80 md:sticky">
              <div className="flex items-center justify-center font-ABCWhyteEdu_Medium text-pMDSemiBold font-normal tracking-[0.02em] text-neutral-100 dark:text-neutral-0 sm:text-pLGSemiBold">
                {data.socialTitle}
              </div>
              <div className="flex items-center justify-center pt-2 pb-8 font-ABCWhyteEdu_Regular text-pSMRegular font-normal text-neutral-50 dark:text-neutral-15">
                {data.socialDescription}
              </div>
              <Divider />
              {data.socialProfile.map(
                (
                  { socialProfileIcon, socialProfileLink, socialProfileTitle },
                  index
                ) => (
                  <div key={index} className="pt-8">
                    <PrismicLink field={socialProfileLink}>
                      <div className="flex items-center justify-between text-neutral-100 hover:animate-pulse hover:text-neutral-50 dark:text-neutral-0 dark:hover:text-neutral-30">
                        <div className="flex">
                          <Image
                            src={socialProfileIcon.url ?? ''}
                            alt={socialProfileIcon.alt ?? ''}
                            width={24}
                            height={24}
                            layout="fixed"
                            quality={100}
                            className="dark:brightness-0 dark:invert-[1]"
                          />

                          <div className="flex pl-4 font-ABCWhyteEdu_Regular text-pSMRegular font-normal text-neutral-100  hover:text-neutral-50 dark:text-neutral-0">
                            {socialProfileTitle}
                          </div>
                        </div>
                        <SocialLinkIcon />
                      </div>
                    </PrismicLink>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  const { data } = (await getPage('extensions')) as ExtensionsProps;
  const settings = (await getPage('settings')) as SettingsProps;

  return {
    props: {
      data,
      settings,
    },
  };
};

export default Extensions;
