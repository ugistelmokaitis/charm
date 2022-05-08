import type { GetStaticProps } from 'next';
import type { FC } from 'react';
import type { JSXMapSerializer } from '@prismicio/react';
import { PrismicLink, PrismicRichText } from '@prismicio/react';
import { asText } from '@prismicio/helpers';
import Image from 'next/image';
import Layout from '../components/layout';
import { docResolver, getPage } from '../utils/prismic';
import type { GearProps } from '../types/gear';
import type { SettingsProps } from '../types/settings';
import Container from '../components/container';
import richTextComponents from '../components/richTextComponents';

type IGear = {
  data: GearProps['data'];
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
};

const Gear: FC<IGear> = ({ data, settings }) => (
  <Layout title="" description="" settings={settings}>
    <div className="flex bg-neutral-0 selection:bg-primary-50 selection:text-neutral-100 dark:bg-neutral-100">
      <Container>
        <div className="grid-starts-1 text-white-100 grid grid-cols-12 gap-16 pt-32 md:grid-cols-12 md:gap-8">
          <div className=" col-span-6">
            <PrismicRichText field={data.introTitle} />
            <div className="mb-28 mt-28">
              <div className="font-ABCWhyteEdu_Regular text-pLGRegular font-normal tracking-[0.02em] text-neutral-100 dark:text-neutral-15">
                {data.introDescription}
              </div>
            </div>
          </div>
        </div>

        <div className="text-white-100 grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-8">
          <div className="col-span-3">
            <div className="font-FiraCode_SemiBold text-codeMDSemiBold font-semibold text-primary-100 dark:text-blue-100">
              {data.deviceTitle}
            </div>
            <div className="pt-6 pb-20 font-ABCWhyteEdu_Regular text-pLGRegular font-normal tracking-[0.02em] text-neutral-100 dark:text-neutral-15">
              {data.deviceDescription}
            </div>
          </div>
        </div>

        <div className="col-span-10 grid grid-cols-12 gap-16">
          <div className="col-span-10 mb-28 flex flex-col gap-8 md:flex-row">
            {data.devices.map(({ deviceDetails, deviceImage }, index) => (
              <div key={index} className="flex-1">
                <Image
                  src={deviceImage.url ?? ''}
                  alt={deviceImage.alt ?? ''}
                  width={80}
                  height={80}
                  layout="fixed"
                  quality={100}
                  className="dark:brightness-0 dark:invert-[1]"
                />
                <div className="pt-8 font-ABCWhyteEdu_Regular text-pMDRegular font-normal tracking-[0.02em] text-neutral-100 dark:text-neutral-15">
                  {deviceDetails}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-white-100 grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-8">
          <div className="col-span-4">
            <div className="font-FiraCode_SemiBold text-codeMDSemiBold font-semibold text-primary-100 dark:text-blue-100">
              {data.setupTitle}
            </div>
            <div className="pt-6 pb-20 font-ABCWhyteEdu_Regular text-pLGRegular font-normal tracking-[0.02em] text-neutral-100 dark:text-neutral-15">
              {data.setupDescription}
            </div>
          </div>
        </div>

        <div className="col-span-10 grid grid-cols-12 gap-16">
          <div className="col-span-10 mb-28 flex flex-col gap-8 md:flex-row">
            {data.setup.map(({ setupDetails, setupImage }, index) => (
              <div key={index} className="flex-1">
                <Image
                  src={setupImage.url ?? ''}
                  alt={setupImage.alt ?? ''}
                  width={80}
                  height={80}
                  layout="fixed"
                  quality={100}
                  className="dark:brightness-0 dark:invert-[1]"
                />
                <div className="pt-8 font-ABCWhyteEdu_Regular text-pMDRegular font-normal tracking-[0.02em] text-neutral-100 dark:text-neutral-15">
                  {setupDetails}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-white-100 grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-8">
          <div className="col-span-4">
            <div className="font-FiraCode_SemiBold text-codeMDSemiBold font-semibold text-primary-100 dark:text-blue-100">
              {data.peripheralTitle}
            </div>
            <div className="pt-6 pb-20 font-ABCWhyteEdu_Regular text-pLGRegular font-normal tracking-[0.02em] text-neutral-100 dark:text-neutral-15">
              {data.peripheralDescription}
            </div>
          </div>
        </div>

        <div className="col-span-10 grid grid-cols-12 gap-16">
          <div className="col-span-10 mb-28 flex flex-col gap-8 md:flex-row">
            {data.peripherals.map(
              ({ peripheralDetails, peripheralImage }, index) => (
                <div key={index} className="flex-1">
                  <Image
                    src={peripheralImage.url ?? ''}
                    alt={peripheralImage.alt ?? ''}
                    width={80}
                    height={80}
                    layout="fixed"
                    quality={100}
                    className="dark:brightness-0 dark:invert-[1]"
                  />
                  <div className="pt-8 font-ABCWhyteEdu_Regular text-pMDRegular font-normal tracking-[0.02em] text-neutral-100 dark:text-neutral-15">
                    {peripheralDetails}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
        <div className="grid grid-cols-12 gap-16">
          <div className="col-span-8 col-start-1">
            <div className="font-FiraCode_SemiBold text-codeMDSemiBold font-semibold text-primary-100 dark:text-blue-100">
              {data.softwareTitle}
            </div>
            <div className="font-charmSemiBold text-white-100 pb-20 text-pMDSemiBold font-semibold tracking-[0.02em]">
              {data.softwareTitleDescription}
            </div>
            <div>
              {data.software.map(
                (
                  { softwareTitle, softwareDescription, softwareIcon },
                  index
                ) => (
                  <div key={index}>
                    <div className="pb-12">
                      <div className="flex">
                        <Image
                          src={softwareIcon.url ?? ''}
                          alt={softwareIcon.alt ?? ''}
                          width={24}
                          height={24}
                          layout="fixed"
                          quality={100}
                          className="dark:brightness-0 dark:invert-[1]"
                        />

                        <div className="pl-2 font-ABCWhyteEdu_Medium text-pLGSemiBold font-normal tracking-[0.02em] text-neutral-100 dark:text-neutral-0">
                          {softwareTitle}
                        </div>
                      </div>
                      <div className="pt-4 font-ABCWhyteEdu_Regular text-pLGRegular font-normal tracking-[0.02em] text-neutral-100 dark:text-neutral-15">
                        <PrismicRichText
                          field={softwareDescription}
                          components={introComponents}
                        />
                      </div>
                    </div>
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
  const { data } = (await getPage('gear')) as GearProps;
  const settings = (await getPage('settings')) as SettingsProps;

  return {
    props: {
      data,
      settings,
    },
  };
};

export default Gear;
