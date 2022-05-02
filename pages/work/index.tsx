import type { GetStaticProps } from 'next';
import type { FC } from 'react';
import { PrismicLink, PrismicRichText } from '@prismicio/react';
import { asText } from '@prismicio/helpers';
import Image from 'next/image';
import Layout from '../../components/layout';
import { getPage, getPages } from '../../utils/prismic';
import type { WorkProps } from '../../types/work';
import type { CaseStudyProps } from '../../types/casestudy';
import type { SettingsProps } from '../../types/settings';
import Container from '../../components/container';

type IWork = {
  data: WorkProps['data'];
  settings: SettingsProps;
  casestudies: CaseStudyProps[];
};

const Work: FC<IWork> = ({ data, settings, casestudies }) => (
  <Layout title="" description="" settings={settings}>
    <div className="bg-black-100  selection:text-white-100 selection:bg-purple-100 lg:grid-cols-12">
      <div className="flex bg-neutral-0 selection:bg-primary-50 selection:text-neutral-100 dark:bg-neutral-100">
        <Container>
          <div className="grid-starts-1 text-white-100 grid grid-cols-12 gap-16 pt-32 md:grid-cols-12 md:gap-8">
            <div className=" col-span-4 ">
              <PrismicRichText field={data.introTitle} />
              <div className="mb-28 mt-28" />
            </div>
            {casestudies.map((casestudy, index) => (
              <div className="col-span-4" key={index}>
                <div className="font-FiraCode_SemiBold text-codeMDSemiBold font-semibold text-primary-100 dark:text-blue-100">
                  {casestudy.data.contentPrefix}
                </div>
                <PrismicLink document={casestudy}>
                  <PrismicRichText field={casestudy.data.contentTitle} />
                </PrismicLink>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  const { data } = (await getPage('work')) as WorkProps;
  const casestudies = (await getPages('casestudy')) as CaseStudyProps[];
  const settings = (await getPage('settings')) as SettingsProps;

  return {
    props: {
      data,
      casestudies,
      settings,
    },
  };
};

export default Work;
