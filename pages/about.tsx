import type { GetStaticProps } from 'next';
import type { FC } from 'react';
import { Fragment } from 'react';
import { PrismicLink, PrismicRichText } from '@prismicio/react';
import type { JSXMapSerializer } from '@prismicio/react';
import Image from 'next/image';
import Layout from '../components/layout';
import type { AboutProps } from '../types/about';
import type { SettingsProps } from '../types/settings';
import Container from '../components/container';
import richTextComponents from '../components/richTextComponents';
import SocialLinkIcon from '../public/icons/sociallinkicon.svg';
import Divider from '../components/divider';
import { getPage } from '../utils/prismic';

type IAbout = {
  data: AboutProps['data'];
  settings: SettingsProps;
};

const introComponents: JSXMapSerializer = {
  ...richTextComponents,
  paragraph: ({ children, key, ...props }) => (
    <p
      key={key}
      className="ABCWhyteEdu-Book inline text-pm3 font-[350] text-neutral-100  dark:text-neutral-0 sm:text-pm2"
      {...props}
    >
      {children}
    </p>
  ),
  image: ({ key, node }) => (
    <span className="inline-flex translate-y-1 pl-1 dark:brightness-0 dark:invert-[1]">
      <Image
        key={key}
        src={node.url}
        alt={node.alt ?? ''}
        width={20}
        height={20}
        quality={100}
      />
    </span>
  ),
};

const About: FC<IAbout> = ({ data, settings }) => (
  <Layout
    title={data.titleTag}
    description={data.metaDescription}
    settings={settings}
  >
    <Container>
      <div className="grid-cols-1 gap-5 pt-[8.5rem] md:grid-cols-12 lg:grid lg:pt-44">
        <div className="col-span-1 mb-12 md:mb-28 md:text-left lg:col-span-9">
          <PrismicRichText
            field={data.introTitle}
            components={introComponents}
          />
        </div>
      </div>
      <div className="grid-cols-1 gap-5 md:grid-cols-12 lg:grid ">
        <div className="col-span-6 col-start-1 mx-auto">
          <div className="font-ABCWhyteEdu-Regular text-pLGRegular sm:text-pLGRegular md:text-pLGRegular max-w-[35rem] font-normal tracking-[0.02em] text-neutral-65">
            <PrismicRichText
              field={data.introDescription}
              components={introComponents}
            />
          </div>

          <div className="mb-20 mt-20">
            <PrismicRichText
              field={data.introParagprah}
              components={introComponents}
            />
          </div>
          {data.moreThings.map(
            ({ moreThingsDescription, moreThingsTitle }, index) => (
              <Fragment key={index}>
                <h2 className="font-FiraCode_SemiBold mt-20 text-cs2 font-semibold text-primary-100 dark:text-blue-100">
                  {moreThingsTitle}
                </h2>
                <div className="pt-6">
                  <PrismicRichText
                    field={moreThingsDescription}
                    components={introComponents}
                  />
                </div>
              </Fragment>
            )
          )}
          <div>
            <h2 className="font-FiraCode_SemiBold mt-20 mb-6 text-cs2 font-semibold text-primary-100 dark:text-blue-100">
              {data.mygoToolsTitle}
            </h2>
            {data.moreTools.map(
              (
                {
                  moreToolsTitle,
                  moreToolsDescription,
                  moreToolsAbout,
                  moreToolsImage,
                },
                index
              ) => (
                <div key={index}>
                  <p className=" ABCWhyteEdu-Book text-pm3 font-[350] text-neutral-100 dark:text-neutral-0 sm:text-pm2">
                    {moreToolsAbout}
                  </p>
                  <div className="mt-8 mb-12 flex items-center">
                    <div className="flex rounded-[0.5rem] border-[0.03125rem] border-neutral-15 bg-primary-5 py-8 px-8 dark:border-neutral-50  dark:bg-neutral-80">
                      <Image
                        src={moreToolsImage.url ?? ''}
                        alt={moreToolsImage.alt ?? ''}
                        width={52}
                        height={52}
                        layout="fixed"
                        quality={100}
                        className="dark:brightness-0 dark:invert-[1]"
                      />

                      <div className="ml-8">
                        <h3 className="ABCWhyteEdu-Medium text-pm2 font-medium text-neutral-100 dark:text-neutral-0 sm:text-pm1">
                          {moreToolsTitle}
                        </h3>
                        <p className="font-codeRegular font-FiraCode_Regular mt-1 text-cs2 font-normal text-neutral-65 dark:text-neutral-15">
                          {moreToolsDescription}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
        <div className="col-span-4 max-w-[20rem] pt-20 md:relative md:col-start-9 lg:pt-0  xl:col-span-3 xl:col-start-10 xl:max-w-full">
          <div className="top-[6.5625rem] rounded-[1.25rem] border-[0.03125rem] border-neutral-15 bg-primary-5 py-8 px-8 dark:border-neutral-50 dark:bg-neutral-80 md:sticky">
            <div>
              <div className="flex justify-center">
                <Image
                  src={data.profileImage.url ?? ''}
                  alt={data.profileImage.alt ?? ''}
                  width={144}
                  height={144}
                  layout="fixed"
                  quality={100}
                />
              </div>
              <h4 className="ABCWhyteEdu-Medium mt-8 mb-2 flex items-center justify-center text-pm2 font-medium text-neutral-100 dark:text-neutral-0 sm:text-pm1">
                {data.profileName}
              </h4>
              <p className="ABCWhyteEdu-Medium flex items-center justify-center font-[350] text-neutral-65 dark:text-neutral-15">
                {data.profileLocation}
              </p>
              <div className="mb-8 mt-8">
                <Divider />
              </div>
              {data.profileSocials.map(
                (
                  {
                    profileSocialsCategory,
                    profileSocialsCategoryLink,
                    profileSocialsIcon,
                  },
                  index
                ) => (
                  <div key={index} className="mt-4">
                    <PrismicLink field={profileSocialsCategoryLink}>
                      <div className="flex items-center justify-between text-center text-neutral-100 hover:animate-pulse hover:text-neutral-50 dark:text-neutral-0 dark:hover:text-neutral-30">
                        <div className="flex items-center pr-4">
                          <Image
                            src={profileSocialsIcon.url ?? ''}
                            alt={profileSocialsIcon.alt ?? ''}
                            width={20}
                            height={20}
                            layout="fixed"
                            quality={100}
                            className="dark:brightness-0 dark:invert-[1]"
                          />

                          <p className="ABCWhyteEdu-Medium ml-4 flex text-center font-[350] text-neutral-100  hover:text-neutral-50 dark:text-neutral-0">
                            {profileSocialsCategory}
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
      </div>
    </Container>
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  const { data } = (await getPage('about')) as AboutProps;
  const settings = (await getPage('settings')) as SettingsProps;

  return {
    props: {
      data,
      settings,
    },
  };
};

export default About;
