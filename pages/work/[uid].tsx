import type { GetStaticPaths, GetStaticProps } from 'next';
import type { FC } from 'react';
import type {
  EmbedField,
  ImageFieldImage,
  KeyTextField,
  PrismicDocumentWithUID,
} from '@prismicio/types';
import type { SliceZoneComponents, SliceZoneProps } from '@prismicio/react';
import { SliceZone } from '@prismicio/react';
import Image from 'next/image';
import Layout from '../../components/layout';
import { getPage, getPages } from '../../utils/prismic';
import { components } from '../../slices';
import type { SettingsProps } from '../../types/settings';
import type { CaseStudyProps } from '../../types/casestudy';

type ICaseStudy = {
  settings: SettingsProps;
  data: CaseStudyProps['data'];
  slices1: SliceZoneProps['slices'];
};

const CaseStudy: FC<ICaseStudy> = ({ data, settings }) => (
  <Layout title="" description="" settings={settings}>
    <div className="flex flex-col gap-8">
      <SliceZone
        slices={data.slices1}
        components={components as unknown as SliceZoneComponents}
      />
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
