import type { GetStaticProps } from 'next';
import type { FC } from 'react';
import { PrismicLink, PrismicRichText } from '@prismicio/react';
import type { JSXMapSerializer } from '@prismicio/react';
import { asText } from '@prismicio/helpers';
import Image from 'next/image';
import Layout from '../components/layout';
import { getPage } from '../utils/prismic';
import type { AboutProps } from '../types/about';
import type { SettingsProps } from '../types/settings';
import Container from '../components/container';
import richTextComponents from '../components/richTextComponents';
import ArrowIcon from '../public/icons/arrowIcon.svg';

type IAbout = {
  data: AboutProps['data'];
  settings: SettingsProps;
};

const introComponents: JSXMapSerializer = {
  ...richTextComponents,
  paragraph: ({ children, key, ...props }) => (
    <p
      key={key}
      className="font-charmRegular inline align-bottom text-pLGRegular font-normal  tracking-[0.02em] text-white-100"
      {...props}
    >
      {children}
    </p>
  ),
  image: ({ key, node }) => (
    <Image
      key={key}
      src={node.url}
      alt={node.alt ?? ''}
      width={24}
      height={24}
      quality={100}
    />
  ),
};

const About: FC<IAbout> = ({ data, settings }) => (
  <Layout title="" description="" settings={settings}>
    <div className="flex bg-neutral-0 selection:bg-primary-50 selection:text-neutral-100 lg:grid-cols-12">
      <Container>
        <div className="grid grid-cols-1 gap-16 pb-28 pt-32 text-white-100 md:grid-cols-12 md:gap-8">
          <div className="col-span-1 md:col-span-7 md:text-left xl:col-span-7">
            <PrismicRichText
              field={data.introTitle}
              components={introComponents}
            />
          </div>
        </div>
      </Container>
      <Container>
        <div className="grid grid-cols-1 gap-16 pb-28  text-white-100 md:grid-cols-12 md:gap-8">
          <div className="mx-autocol-span-1 sticky top-20 max-w-[41rem] md:col-span-6 md:text-left xl:col-span-6">
            <div className="font-charmRegular text-pLGRegular font-normal tracking-[0.02em] text-white-100">
              <PrismicRichText
                field={data.introDescription}
                components={introComponents}
              />
            </div>

            <div className=" font-charmRegular pt-20 pb-28 text-pLGRegular font-normal tracking-[0.02em]  text-white-100">
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
                    className="font-charmSemiBold mb-6 text-pSMSemiBold font-semibold tracking-[0.02em] text-purple-100 "
                  >
                    <PrismicRichText field={moreThingsTitle} />
                  </div>
                  <div className="font-charmRegular mb-28 text-pLGRegular font-normal tracking-[0.02em] text-white-100">
                    <PrismicRichText
                      field={moreThingsDescription}
                      components={introComponents}
                    />
                  </div>
                </>
              )
            )}
            <div className="pb-32">
              <div className="font-charmSemiBold mb-6 text-pMDSemiBold font-semibold tracking-[0.02em] text-purple-100">
                <PrismicRichText field={data.mygoToolsTitle} />
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
                  <div key={index} className="">
                    <div className="font-charmRegular mb-8 text-pLGRegular font-normal tracking-[0.02em] text-white-100">
                      {asText(moreToolsAbout)}
                    </div>
                    <div className="mb-20 flex items-center">
                      <div className="bg-darkestGrey-100 flex rounded-[0.5rem] py-8 px-8">
                        <Image
                          src={moreToolsImage.url ?? ''}
                          alt={moreToolsImage.alt ?? ''}
                          width={52}
                          height={52}
                          layout="fixed"
                          quality={100}
                        />

                        <div className="pl-8">
                          <div className="font-charmSemiBold text-pSMSemiBold font-semibold tracking-[0.02em] text-white-100">
                            <PrismicRichText field={moreToolsTitle} />
                          </div>
                          <div className="font-regular font-codeRegular text-lightestGrey-100 text-codeMDRegular">
                            {asText(moreToolsDescription)}
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
            <div className="border-darkGrey-100 bg-darkestGrey-100 sticky top-10 rounded-[1.25rem]  border-[0.0625rem] py-8 px-8">
              <div>
                <div>
                  <Image
                    src={data.profileImage.url ?? ''}
                    alt={data.profileImage.alt ?? ''}
                    width={144}
                    height={144}
                    layout="fixed"
                    quality={100}
                  />
                  <div className="font-charmSemiBold pt-8 pb-2 text-pLGSemiBold font-normal tracking-[0.02em] text-white-100">
                    <PrismicRichText field={data.profileName} />
                  </div>
                  <div className="font-charmSemiBold text-lightGrey-100 pb-8 text-pLGSemiBold font-normal tracking-[0.02em]">
                    <PrismicRichText field={data.profileLocation} />
                  </div>
                  <div className="border-mediumGrey-100 border-t pb-8" />
                  {data.profileSocials.map(
                    (
                      {
                        profileSocialsCategory,
                        profileSocialsCategoryLink,
                        profileSocialsIcon,
                      },
                      index
                    ) => (
                      <div key={index} className="mb-4 flex">
                        <div className="flex">
                          <Image
                            src={profileSocialsIcon.url ?? ''}
                            alt={profileSocialsIcon.alt ?? ''}
                            width={24}
                            height={24}
                            layout="fixed"
                            quality={100}
                          />

                          <PrismicLink field={profileSocialsCategoryLink}>
                            <div className="font-charmSemiBold text-lightGrey-100  flex items-center pl-4 text-pSMSemiBold font-semibold tracking-[0.02em] hover:text-white-100">
                              <PrismicRichText field={profileSocialsCategory} />

                              <ArrowIcon />
                            </div>
                          </PrismicLink>
                        </div>
                      </div>
                    )
                  )}
                </div>
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
