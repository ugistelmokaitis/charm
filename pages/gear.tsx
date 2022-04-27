import type { GetStaticProps } from 'next';
import type { FC } from 'react';
import { PrismicRichText } from '@prismicio/react';
import { asText } from '@prismicio/helpers';
import Image from 'next/image';
import Layout from '../components/layout';
import { getPage } from '../utils/prismic';
import type { GearProps } from '../types/gear';
import type { SettingsProps } from '../types/settings';
import Container from '../components/container';

type IGear = {
  data: GearProps['data'];
  settings: SettingsProps;
};

const Gear: FC<IGear> = ({ data, settings }) => (
  <Layout title="" description="" settings={settings}>
    <div className="bg-black-100  selection:bg-purple-100 selection:text-white-100 lg:grid-cols-12">
      <Container>
        <div className="grid-starts-1 grid grid-cols-12 gap-16 pt-32 text-white-100 md:grid-cols-12 md:gap-8">
          <div className=" col-span-4 ">
            <PrismicRichText field={data.introTitle} />
            <div className="mb-28 mt-28">
              <PrismicRichText field={data.introDescription} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-16 text-white-100 md:grid-cols-12 md:gap-8">
          <div className="col-span-3">
            <div className="pb-6 font-codeSemiBold text-codeMDSemiBold font-semibold text-purple-100">
              <PrismicRichText field={data.deviceTitle} />
            </div>
            <div className="pb-20 font-charmRegular text-pLGRegular font-normal tracking-[0.02em] text-lightestGrey-100">
              {asText(data.deviceDescription)}
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
                />
                <div className="max-w-[16.5rem] pt-8 font-charmSemiBold text-pMDSemiBold font-semibold tracking-[0.02em] text-white-100 ">
                  <PrismicRichText field={deviceDetails} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-16 text-white-100 md:grid-cols-12 md:gap-8">
          <div className="col-span-3">
            <div className="pb-6 font-codeSemiBold text-codeMDSemiBold font-semibold text-purple-100">
              <PrismicRichText field={data.setupTitle} />
            </div>
            <div className="pb-20 font-charmRegular text-pLGRegular font-normal tracking-[0.02em] text-lightestGrey-100">
              {asText(data.setupDescription)}
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
                />
                <div className="max-w-[16.5rem] pt-8 font-charmSemiBold text-pMDSemiBold font-semibold tracking-[0.02em] text-white-100 ">
                  <PrismicRichText field={setupDetails} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-16 text-white-100 md:grid-cols-12 md:gap-8">
          <div className="col-span-3">
            <div className="pb-6 font-codeSemiBold text-codeMDSemiBold font-semibold text-purple-100">
              <PrismicRichText field={data.peripheralTitle} />
            </div>
            <div className="pb-20 font-charmRegular text-pLGRegular font-normal tracking-[0.02em] text-lightestGrey-100">
              {asText(data.peripheralDescription)}
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
                  />
                  <div className="max-w-[16.5rem] pt-8 font-charmSemiBold text-pMDSemiBold font-semibold tracking-[0.02em] text-white-100 ">
                    <PrismicRichText field={peripheralDetails} />
                  </div>
                </div>
              )
            )}
          </div>
        </div>
        <div className="font-charmSemiBold text-pLGSemiBold font-normal tracking-[0.02em]  text-purple-100">
          {asText(data.softwareTitle)}
        </div>
        <div className="pb-20 font-charmSemiBold text-pMDSemiBold font-semibold tracking-[0.02em] text-white-100">
          <PrismicRichText field={data.softwareTitleDescription} />
        </div>
        <div>
          {data.software.map(
            ({ softwareTitle, softwareDescription, softwareIcon }, index) => (
              <div key={index}>
                <div className="flex pb-12">
                  <Image
                    src={softwareIcon.url ?? ''}
                    alt={softwareIcon.alt ?? ''}
                    width={24}
                    height={24}
                    layout="fixed"
                    quality={100}
                  />
                  <div className="text-left">
                    <div className="pl-2 pb-4 font-charmSemiBold text-pMDSemiBold font-semibold tracking-[0.02em] text-white-100">
                      <PrismicRichText field={softwareTitle} />
                    </div>
                    <div className="pl-2 pb-4 font-charmSemiBold text-pMDSemiBold font-semibold tracking-[0.02em] text-white-100">
                      <PrismicRichText field={softwareDescription} />
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
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
