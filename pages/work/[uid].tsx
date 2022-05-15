import type { GetStaticPaths, GetStaticProps } from 'next';
import type { FC } from 'react';
import type {
  EmbedField,
  ImageFieldImage,
  KeyTextField,
  PrismicDocumentWithUID,
} from '@prismicio/types';
import type { SliceZoneProps, SliceZoneComponents } from '@prismicio/react';
import { PrismicImage, PrismicRichText, SliceZone } from '@prismicio/react';
import Image from 'next/image';
import Layout from '../../components/layout';
import { getPage, getPages } from '../../utils/prismic';
import { components } from '../../slices';
import type { SettingsProps } from '../../types/settings';
import type { CaseStudyProps } from '../../types/casestudy';
import Container from '../../components/container';

type ICaseStudy = {
  settings: SettingsProps;
  data: CaseStudyProps['data'];
  slices2: SliceZoneProps['slices'];
};

const CaseStudy: FC<ICaseStudy> = ({ data, settings }) => (
  <Layout title="" description="" settings={settings}>
    <div className="bg-neutral-0 selection:bg-primary-50 selection:text-neutral-100 dark:bg-neutral-100 lg:flex">
      <Container>
        <div className="bg-neutral-0 selection:bg-primary-50 selection:text-neutral-100 dark:bg-neutral-100 lg:flex">
          <div className="grid-starts-1 text-white-100 gap-16 pt-56 md:grid-cols-12 md:gap-8 lg:grid">
            <div className="col-span-6">
              <div className="mb-8 font-FiraCode_SemiBold text-codeMDSemiBold font-semibold text-primary-100 dark:text-blue-100">
                {data.contentPrefix}
              </div>
              <PrismicRichText field={data.contentTitle} />
            </div>
            <div className="col-span-12 mt-20 lg:mt-20">
              <Image
                src={data.contentImage.url ?? ''}
                alt={data.contentImage.alt ?? ''}
                width={1248}
                height={650}
                layout="responsive"
                quality={100}
              />
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = (await getPage(
    params?.uid as string,
    'casestudy'
  )) as CaseStudyProps;
  const settings = (await getPage('settings')) as SettingsProps;

  return {
    props: {
      data,
      settings,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const casestudies = (await getPages('casestudy')) as CaseStudyProps[];

  const paths = casestudies.map(({ uid }) => ({
    params: {
      uid,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default CaseStudy;
