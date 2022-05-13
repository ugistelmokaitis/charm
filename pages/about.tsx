import type { GetStaticProps } from 'next';
import type { FC } from 'react';
import { PrismicLink, PrismicRichText } from '@prismicio/react';
import type { JSXMapSerializer } from '@prismicio/react';
import { asText } from '@prismicio/helpers';
import Image from 'next/image';
import Layout from '../components/layout';
import { docResolver, getPage } from '../utils/prismic';
import type { AboutProps } from '../types/about';
import type { SettingsProps } from '../types/settings';
import Container from '../components/container';
import richTextComponents from '../components/richTextComponents';
import SocialLinkIcon from '../public/icons/socialLinkIcon.svg';
import Divider from '../components/divider';

type IAbout = {
  data: AboutProps['data'];
  settings: SettingsProps;
};

const introComponents: JSXMapSerializer = {
  ...richTextComponents,
  paragraph: ({ children, key, ...props }) => (
    <p
      key={key}
      className="inline font-ABCWhyteEdu_Regular text-pSMRegular font-normal tracking-[0.02em] text-neutral-65 dark:text-neutral-15  md:text-pLGRegular"
      {...props}
    >
      {children}
    </p>
  ),
  hyperlink: ({ children, key, node }) => (
    <PrismicLink key={key} href={docResolver(node.data)}>
      <div
        key={key}
        className="inline text-neutral-100 underline hover:text-neutral-50 dark:text-neutral-0 dark:hover:text-neutral-30"
      >
        {children}
      </div>
    </PrismicLink>
  ),
  image: ({ key, node }) => (
    <span className="inline-flex translate-y-1 dark:brightness-0 dark:invert-[1]">
      <Image
        key={key}
        src={node.url}
        alt={node.alt ?? ''}
        width={24}
        height={24}
        quality={100}
      />
    </span>
  ),
};

const About: FC<IAbout> = ({ data, settings }) => (
  <Layout title="" description="" settings={settings}>
    <div className="flex bg-neutral-0 selection:bg-primary-50 selection:text-neutral-100 dark:bg-neutral-100 lg:grid-cols-12">
      <Container>
        <div className="text-white-100 grid-cols-1 gap-16 pt-56 md:grid-cols-12 md:gap-8 lg:grid">
          <div className="col-span-1 mb-12 md:col-span-7 md:text-left xl:col-span-7">
            <PrismicRichText
              field={data.introTitle}
              components={introComponents}
            />
          </div>
        </div>
        <div className="text-white-100 grid-cols-1 gap-16 md:grid-cols-12 md:gap-8 lg:grid ">
          <div className="col-span-6 col-start-1 mx-auto">
            <div className="max-w-[35rem] font-ABCWhyteEdu_Regular text-pLGRegular font-normal tracking-[0.02em] text-neutral-65">
              <PrismicRichText
                field={data.introDescription}
                components={introComponents}
              />
            </div>

            <div className="mb-20 mt-20 md:mb-28">
              <PrismicRichText
                field={data.introParagprah}
                components={introComponents}
              />
            </div>
            {data.moreThings.map(
              ({ moreThingsDescription, moreThingsTitle }, index) => (
                <>
                  <div
                    key={index}
                    className="font-FiraCode_SemiBold text-codeMDSemiBold font-semibold text-primary-100 dark:text-blue-100"
                  >
                    {moreThingsTitle}
                  </div>
                  <div className="mb-20 pt-6 md:mb-28">
                    <PrismicRichText
                      field={moreThingsDescription}
                      components={introComponents}
                    />
                  </div>
                </>
              )
            )}
            <div>
              <div className="mb-6 font-FiraCode_SemiBold text-codeMDSemiBold font-semibold text-primary-100 dark:text-blue-100">
                {data.mygoToolsTitle}
              </div>
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
                    <div className="font-ABCWhyteEdu_Regular text-pSMRegular font-normal tracking-[0.02em] text-neutral-100 dark:text-neutral-0 md:text-pLGRegular">
                      {moreToolsAbout}
                    </div>
                    <div className="mt-8 mb-12 flex items-center">
                      <div className="flex rounded-[0.5rem] border-[0.03125rem] border-neutral-50 bg-primary-5 py-8 px-8  dark:bg-neutral-80">
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
                          <div className="font-ABCWhyteEdu_Medium text-pSMSemiBold font-normal tracking-[0.02em] text-neutral-100 dark:text-neutral-0 md:text-pLGSemiBold">
                            {moreToolsTitle}
                          </div>
                          <div className="font-codeRegular mt-2 font-FiraCode_Regular text-[1rem] text-neutral-100 dark:text-neutral-15 md:text-codeMDRegular ">
                            {moreToolsDescription}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="col-span-4 max-w-[20rem] pt-20 md:relative md:col-start-9 lg:pt-0 xl:col-span-3 xl:col-start-10 xl:max-w-full">
            <div className="top-[6.5625rem] rounded-[1.25rem] border-[0.03125rem] border-neutral-30 bg-primary-5 py-8 px-8 dark:border-neutral-15 dark:bg-neutral-80 md:sticky">
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
                <div className="mt-8 mb-2 flex items-center justify-center font-ABCWhyteEdu_Medium text-pLGSemiBold font-normal tracking-[0.02em] text-neutral-100 dark:text-neutral-0">
                  {data.profileName}
                </div>
                <div className="flex items-center justify-center font-ABCWhyteEdu_Regular text-pSMRegular font-normal text-neutral-100 dark:text-neutral-15">
                  {data.profileLocation}
                </div>
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
                              width={24}
                              height={24}
                              layout="fixed"
                              quality={100}
                              className="dark:brightness-0 dark:invert-[1]"
                            />

                            <div className="ml-4 flex text-center font-ABCWhyteEdu_Regular text-pSMRegular font-normal text-neutral-100  hover:text-neutral-50 dark:text-neutral-0">
                              {profileSocialsCategory}
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
        </div>
      </Container>
    </div>
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
