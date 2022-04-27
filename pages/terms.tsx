import type { GetStaticProps } from 'next';
import type { FC } from 'react';
import { PrismicRichText } from '@prismicio/react';
import { asText } from '@prismicio/helpers';
import Image from 'next/image';
import Layout from '../components/layout';
import { getPage } from '../utils/prismic';
import type { TermsProps } from '../types/terms';
import type { SettingsProps } from '../types/settings';
import Container from '../components/container';

type ITerms = {
  data: TermsProps['data'];
  settings: SettingsProps;
};

const Terms: FC<ITerms> = ({ data, settings }) => (
  <Layout title="" description="" settings={settings}>
    <div className="flex bg-neutral-0 selection:bg-primary-50 selection:text-neutral-100 lg:grid-cols-12">
      <Container>
        <div className="grid-starts-1 grid grid-cols-12 gap-16 pt-32 text-white-100 md:grid-cols-12 md:gap-8">
          <div className=" col-span-4 ">
            <PrismicRichText field={data.introTitle} />
            <div className="mb-8 mt-8">
              <PrismicRichText field={data.introDescription} />
            </div>
            <div className="mb-8 mt-8">
              <PrismicRichText field={data.introDateTitle} />
            </div>
            <div className="mb-28 mt-8">
              <PrismicRichText field={data.contentDescription} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  const { data } = (await getPage('terms')) as TermsProps;
  const settings = (await getPage('settings')) as SettingsProps;

  return {
    props: {
      data,
      settings,
    },
  };
};

export default Terms;
