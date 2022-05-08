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
      className="inline font-ABCWhyteEdu_Regular text-pLGRegular font-normal tracking-[0.02em] text-neutral-65 dark:text-neutral-15"
      {...props}
    >
      {children}
    </p>
  ),
  hyperlink: ({ children, key, node }) => (
    <PrismicLink key={key} href={docResolver(node.data)}>
      <div
        key={key}
        className="inline font-ABCWhyteEdu_Regular text-pLGRegular font-normal tracking-[0.02em] text-neutral-100 underline hover:text-neutral-50 dark:text-neutral-0 dark:hover:text-neutral-30"
      >
        {children}
      </div>
    </PrismicLink>
  ),
  image: ({ key, node }) => (
    <Image
      key={key}
      src={node.url}
      alt={node.alt ?? ''}
      width={24}
      height={24}
      quality={100}
      className="dark:brightness-0 dark:invert-[1]"
    />
  ),
};

const About: FC<IAbout> = ({ data, settings }) => (
  <Layout title="" description="" settings={settings}>
    <div className="flex bg-neutral-0 selection:bg-primary-50 selection:text-neutral-100 dark:bg-neutral-100 lg:grid-cols-12">
      <Container>
        <div className="text-white-100 grid grid-cols-1 gap-16 pb-28 pt-32 md:grid-cols-12 md:gap-8">
          <div className="col-span-1 md:col-span-7 md:text-left xl:col-span-7">
            <PrismicRichText
              field={data.introTitle}
              components={introComponents}
            />
          </div>
        </div>
        <div className="text-white-100 grid grid-cols-1 gap-16  pb-28 md:grid-cols-12 md:gap-8">
          <div className="sticky top-20  col-span-6 col-start-1 mx-auto">
            <div className="max-w-[35rem] font-ABCWhyteEdu_Regular text-pLGRegular font-normal tracking-[0.02em] text-neutral-65">
              <PrismicRichText
                field={data.introDescription}
                components={introComponents}
              />
            </div>

            <div className="pt-20 pb-28">
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
                  <div className="pt-6 pb-28">
                    <PrismicRichText
                      field={moreThingsDescription}
                      components={introComponents}
                    />
                  </div>
                </>
              )
            )}
            <div>
              <div className="pb-6 font-FiraCode_SemiBold text-codeMDSemiBold font-semibold text-primary-100 dark:text-blue-100">
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
                    <div className="font-ABCWhyteEdu_Regular text-pLGRegular font-normal tracking-[0.02em] text-neutral-100 dark:text-neutral-0">
                      {moreToolsAbout}
                    </div>
                    <div className="flex items-center pb-20 pt-8">
                      <div className="flex rounded-[0.5rem] border-[0.03125rem] border-neutral-50 bg-primary-5 py-8 px-8 dark:bg-neutral-80">
                        <Image
                          src={moreToolsImage.url ?? ''}
                          alt={moreToolsImage.alt ?? ''}
                          width={52}
                          height={52}
                          layout="fixed"
                          quality={100}
                          className="dark:brightness-0 dark:invert-[1]"
                        />

                        <div className="pl-8">
                          <div className="font-ABCWhyteEdu_Medium text-pLGSemiBold font-normal tracking-[0.02em] text-neutral-100 dark:text-neutral-0">
                            {moreToolsTitle}
                          </div>
                          <div className="font-codeRegular pt-2 font-FiraCode_Regular text-codeMDRegular text-neutral-100 dark:text-neutral-15 ">
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
          <div className="relative col-span-3 col-start-10">
            <div className="sticky top-10 rounded-[1.25rem] border-[0.03125rem] border-neutral-30 bg-primary-5 py-8 px-8 dark:border-neutral-15 dark:bg-neutral-80">
              <div>
                <div className="flex items-center justify-center">
                  <Image
                    src={data.profileImage.url ?? ''}
                    alt={data.profileImage.alt ?? ''}
                    width={144}
                    height={144}
                    layout="fixed"
                    quality={100}
                  />
                </div>
                <div className="flex items-center justify-center pt-8 pb-2 font-ABCWhyteEdu_Medium text-pLGSemiBold font-normal tracking-[0.02em] text-neutral-100 dark:text-neutral-0">
                  {data.profileName}
                </div>
                <div className="flex items-center justify-center font-ABCWhyteEdu_Regular text-pSMRegular font-normal text-neutral-100 dark:text-neutral-15">
                  {data.profileLocation}
                </div>
                <div className="pb-8 pt-8">
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
                    <div key={index} className="pt-4">
                      <PrismicLink field={profileSocialsCategoryLink}>
                        <div className="flex justify-between text-neutral-100 hover:animate-pulse hover:text-neutral-50 dark:text-neutral-0 dark:hover:text-neutral-30">
                          <div className="flex pr-4 ">
                            <Image
                              src={profileSocialsIcon.url ?? ''}
                              alt={profileSocialsIcon.alt ?? ''}
                              width={24}
                              height={24}
                              layout="fixed"
                              quality={100}
                              className="dark:brightness-0 dark:invert-[1]"
                            />

                            <div className="flex pl-4 font-ABCWhyteEdu_Regular text-pSMRegular font-normal text-neutral-100  hover:text-neutral-50 dark:text-neutral-0">
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
