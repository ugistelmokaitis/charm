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
import ArrowIcon from '../public/icons/arrowIcon.svg';

type IExtensions = {
  data: ExtensionsProps['data'];
  settings: SettingsProps;
};

const Extensions: FC<IExtensions> = ({ data, settings }) => (
  <Layout title="" description="" settings={settings}>
    <div className="flex bg-neutral-0 selection:bg-primary-50 selection:text-neutral-100 lg:grid-cols-12">
      <Container>
        <div className="grid-starts-1 grid grid-cols-12 gap-16 pt-32 text-white-100 md:grid-cols-12 md:gap-8">
          <div className=" col-span-4 ">
            <PrismicRichText field={data.introTitle} />
            <div className="mb-28 mt-28">
              <PrismicRichText field={data.introDescription} />
            </div>
            <div className=" font-charmRegular pt-20 pb-28 text-pLGRegular font-normal tracking-[0.02em]  text-purple-100">
              <PrismicRichText field={data.extensionsTitle} />
            </div>
            {data.extentions.map(
              ({ extentionDescription, extentionTitle }, index) => (
                <>
                  <div
                    key={index}
                    className="font-charmSemiBold mb-6 text-pSMSemiBold font-semibold tracking-[0.02em] text-white-100 "
                  >
                    <PrismicRichText field={extentionTitle} />
                  </div>
                  <div className="font-charmRegular mb-28 text-pLGRegular font-normal tracking-[0.02em] text-white-100">
                    <PrismicRichText field={extentionDescription} />
                  </div>
                </>
              )
            )}
          </div>
          <div className="relative col-span-3 col-start-10">
            <div className="border-darkGrey-100 bg-darkestGrey-100 sticky top-10 rounded-[1.25rem]  border-[0.0625rem] py-8 px-8">
              <div className="font-charmSemiBold pt-8 pb-2 text-pLGSemiBold font-normal tracking-[0.02em] text-white-100">
                <PrismicRichText field={data.socialTitle} />
              </div>
              <div className="font-charmSemiBold pt-8 pb-2 text-pLGSemiBold font-normal tracking-[0.02em] text-white-100">
                <PrismicRichText field={data.socialDescription} />
              </div>
              <div className="border-mediumGrey-100 border-t pb-8" />
              {data.socialProfile.map(
                (
                  { socialProfileIcon, socialProfileLink, socialProfileTitle },
                  index
                ) => (
                  <div key={index} className="mb-4 flex">
                    <div className="flex">
                      <Image
                        src={socialProfileIcon.url ?? ''}
                        alt={socialProfileIcon.alt ?? ''}
                        width={24}
                        height={24}
                        layout="fixed"
                        quality={100}
                      />

                      <PrismicLink field={socialProfileLink}>
                        <div className="font-charmSemiBold text-lightGrey-100  flex items-center pl-4 text-pSMSemiBold font-semibold tracking-[0.02em] hover:text-white-100">
                          <PrismicRichText field={socialProfileTitle} />

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
