import type { GetStaticProps } from 'next';
import type { FC } from 'react';
import { PrismicRichText, SliceZone } from '@prismicio/react';
import type { SliceZoneProps, SliceZoneComponents } from '@prismicio/react';
import Layout from '../components/layout';
import { getPage } from '../utils/prismic';
import type { PrivacyProps } from '../types/privacy';
import type { SettingsProps } from '../types/settings';
import Container from '../components/container';
import { components } from '../slices';

type IPrivacy = {
  data: PrivacyProps['data'];
  settings: SettingsProps;
  slices2: SliceZoneProps['slices'];
};

const Privacy: FC<IPrivacy> = ({ data, settings }) => (
  <Layout
    title={data.titleTag}
    description={data.metaDescription}
    settings={settings}
  >
    <div className="flex lg:grid-cols-12">
      <Container>
        <div className=" text-white-100 grid-cols-1 gap-5 md:grid md:grid-cols-12 md:gap-8">
          <div className="pt-[8.5rem] sm:col-span-8 sm:col-start-3 lg:pt-44">
            <PrismicRichText field={data.introTitle} />
            <div className="mb-12 mt-12">
              <p className="ABCWhyteEdu-Book text-pm3 font-[350] text-neutral-100 dark:text-neutral-15 sm:text-pm2">
                {data.introDescription}
              </p>
            </div>
            <div className="mb-2 mt-2">
              <p className="font-FiraCode-Regular text-cs2 font-normal text-neutral-100 dark:text-neutral-0">
                {data.IntroDateTitle}
              </p>
            </div>
            <div className="mb-20">
              <p className="font-FiraCode-Regular text-cs2 font-normal text-neutral-100 dark:text-neutral-0">
                {data.introLastUpdate}
              </p>
            </div>
            <SliceZone
              slices={data.slices2}
              components={components as unknown as SliceZoneComponents}
            />
          </div>
        </div>
      </Container>
    </div>
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  const { data } = (await getPage('privacy')) as PrivacyProps;
  const settings = (await getPage('settings')) as SettingsProps;

  return {
    props: {
      data,
      settings,
    },
  };
};

export default Privacy;
