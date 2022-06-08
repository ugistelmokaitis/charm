import type { GetStaticProps } from 'next';
import type { FC } from 'react';
import { Fragment } from 'react';
import { PrismicLink, PrismicRichText } from '@prismicio/react';
import Image from 'next/image';
import Layout from '../components/layout';
import { getPage } from '../utils/prismic';
import type { ExtensionsProps } from '../types/extensions';
import type { SettingsProps } from '../types/settings';
import Container from '../components/container';
import SocialLinkIcon from '../public/icons/sociallinkicon.svg';
import Divider from '../components/divider';

type IExtensions = {
  data: ExtensionsProps['data'];
  settings: SettingsProps;
};

const Extensions: FC<IExtensions> = ({ data, settings }) => (
  <Layout
    title={data.titleTag}
    description={data.metaDescription}
    settings={settings}
  >
    <Container>
      <div className="grid-starts-1 text-white-100 gap-16 pt-56 md:grid-cols-12 md:gap-8 lg:grid">
        <div className="col-span-6">
          <PrismicRichText field={data.introTitle} />
          <p className="ABCWhyteEdu-Book mt-20 mb-20 text-pm3  font-[350] text-neutral-100 dark:text-neutral-0 sm:text-pm2 xl:mt-28 xl:mb-28">
            {data.introDescription}
          </p>
          <h2 className="font-FiraCode_SemiBold text-cs2 font-semibold text-primary-100 dark:text-blue-100">
            {data.extensionsTitle}
          </h2>
          {data.extentions.map(
            ({ extentionDescription, extentionTitle }, index) => (
              <Fragment key={index}>
                <h3 className="ABCWhyteEdu-Medium mt-6 mb-4 text-pm2 font-medium text-neutral-100 dark:text-neutral-0 sm:text-pm1">
                  {extentionTitle}
                </h3>
                <p className="ABCWhyteEdu-Book pb-6 text-pm3 font-[350] text-neutral-65 dark:text-neutral-15 sm:text-pm2">
                  {extentionDescription}
                </p>
              </Fragment>
            )
          )}
        </div>
        <div className="col-span-4 col-start-10 max-w-[20rem] pt-14 md:relative md:col-start-9 lg:pt-0 xl:col-span-3 xl:col-start-10 xl:max-w-full">
          <div className="top-[6.5625rem] rounded-[1.25rem] border-[0.03125rem] border-neutral-30 bg-primary-5 py-8 px-8 dark:border-neutral-15 dark:bg-neutral-80 md:sticky">
            <h2 className="ABCWhyteEdu-Medium flex items-center justify-center text-pm2 font-medium text-neutral-100 dark:text-neutral-0 sm:text-pm1">
              {data.socialTitle}
            </h2>
            <p className="ABCWhyteEdu-Medium flex items-center justify-center pt-2 pb-8 font-[350] text-neutral-50 dark:text-neutral-15">
              {data.socialDescription}
            </p>
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

                        <p className="ABCWhyteEdu-Medium flex pl-4 font-[350] text-neutral-100 hover:text-neutral-50 dark:text-neutral-0">
                          {socialProfileTitle}
                        </p>
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
