import type { GetStaticProps } from 'next';
import type { FC } from 'react';
import type { JSXMapSerializer } from '@prismicio/react';
import { PrismicRichText } from '@prismicio/react';
import Image from 'next/image';
import Layout from '../components/layout';
import type { GearProps } from '../types/gear';
import type { SettingsProps } from '../types/settings';
import Container from '../components/container';
import richTextComponents from '../components/richTextComponents';
import { getPage } from '../utils/prismic';

type IGear = {
  data: GearProps['data'];
  settings: SettingsProps;
};

const introComponents: JSXMapSerializer = {
  ...richTextComponents,
  paragraph: ({ children, key, ...props }) => (
    <p
      key={key}
      className="ABCWhyteEdu-Book inline text-pm3 font-[350] text-neutral-65 dark:text-neutral-15 sm:text-pm2"
      {...props}
    >
      {children}
    </p>
  ),
};

const Gear: FC<IGear> = ({ data, settings }) => (
  <Layout
    title={data.titleTag}
    description={data.metaDescription}
    settings={settings}
  >
    <Container>
      <div className="grid-starts-1 text-white-100 pt-32 md:grid-cols-12 md:gap-8 lg:grid">
        <div className="col-span-7">
          <PrismicRichText field={data.introTitle} />
          <div className="mb-20 mt-20">
            <p className="ABCWhyteEdu-Book text-pm3 font-[350] text-neutral-100 dark:text-neutral-15 sm:text-pm2">
              {data.introDescription}
            </p>
          </div>
        </div>
      </div>
      <div className="text-white-100 grid-cols-1 gap-16 md:grid-cols-12 md:gap-8 lg:grid">
        <div className="col-span-3">
          <h2 className="font-FiraCode_SemiBold text-cs2 font-semibold text-primary-100 dark:text-blue-100">
            {data.deviceTitle}
          </h2>
          <p className="ABCWhyteEdu-Book pt-6 pb-20 text-pm3 font-[350] text-neutral-100 dark:text-neutral-15 sm:pb-12 sm:text-pm2">
            {data.deviceDescription}
          </p>
        </div>
      </div>
      <div className="col-span-10 grid-cols-12 gap-16 lg:grid">
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
              <p className="ABCWhyteEdu-Medium pt-8 font-medium text-neutral-100 dark:text-neutral-15">
                {deviceDetails}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-white-100 grid-cols-1 gap-16 md:grid-cols-12 md:gap-8 lg:grid">
        <div className="col-span-4">
          <h2 className="text-codeMDSemiBold font-FiraCode-SemiBold font-semibold text-primary-100 dark:text-blue-100">
            {data.setupTitle}
          </h2>
          <p className="ABCWhyteEdu-Book pt-6 pb-20 text-pm3 font-[350] text-neutral-100 dark:text-neutral-15 sm:text-pm2">
            {data.setupDescription}
          </p>
        </div>
      </div>
      <div className="col-span-10 grid-cols-12 gap-16 lg:grid">
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
              <p className="font-ABCWhyteEdu-Regular text-pSMRegular sm:text-pLGRegular pt-6 pb-20 font-normal text-neutral-100 dark:text-neutral-15">
                {setupDetails}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="text-white-100 grid-cols-1 gap-16 md:grid-cols-12 md:gap-8 lg:grid">
        <div className="col-span-4">
          <h2 className="text-codeMDSemiBold font-FiraCode-SemiBold font-semibold text-primary-100 dark:text-blue-100">
            {data.peripheralTitle}
          </h2>
          <p className="ABCWhyteEdu-Book pt-6 pb-20 text-pm3 font-[350] text-neutral-100 dark:text-neutral-15 sm:text-pm2">
            {data.peripheralDescription}
          </p>
        </div>
      </div>
      <div className="col-span-10 gap-16 md:grid-cols-12 lg:grid">
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
                <p className="font-ABCWhyteEdu-Regular text-pSMRegular sm:text-pLGRegular pt-6 pb-20 font-normal text-neutral-100 dark:text-neutral-15">
                  {peripheralDetails}
                </p>
              </div>
            )
          )}
        </div>
      </div>
      <div className="gap-16 md:grid-cols-12 lg:grid">
        <div className="col-span-6 col-start-1">
          <h2 className="font-FiraCode_SemiBold text-cs2 font-semibold text-primary-100 dark:text-blue-100">
            {data.softwareTitle}
          </h2>
          <div className="dark:text-white-100 ABCWhyteEdu-Book pb-20  text-pm3 font-[350]  text-neutral-100 sm:text-pm2">
            {data.softwareTitleDescription}
          </div>
          <div>
            {data.software.map(
              ({ softwareTitle, softwareDescription, softwareIcon }, index) => (
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
                      <h3 className="font-FiraCode_SemiBold pl-2 text-cs2 font-semibold text-neutral-100 dark:text-neutral-0">
                        {softwareTitle}
                      </h3>
                    </div>
                    <div className="ABCWhyteEdu-Book pt-4 text-pm3 font-[350] text-neutral-100 dark:text-neutral-15 sm:text-pm2">
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
