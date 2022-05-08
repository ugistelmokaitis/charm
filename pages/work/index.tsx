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
import CaseStudy from './[uid]';

type IWork = {
  data: WorkProps['data'];
  settings: SettingsProps;
  casestudies: CaseStudyProps[];
};

const Work: FC<IWork> = ({ data, settings, casestudies }) => (
  <Layout title="" description="" settings={settings}>
    <div className="flex bg-neutral-0 selection:bg-primary-50 selection:text-neutral-100 dark:bg-neutral-100">
      <Container>
        <div className="grid-starts-1 text-white-100 grid grid-cols-12 gap-16  pt-32 md:grid-cols-12 md:gap-8">
          <div className="col-span-4">
            <PrismicRichText field={data.introTitle} />
            <div className="mb-28 mt-28" />
          </div>
        </div>
        {casestudies.map((casestudy, index) => (
          <div key={index}>
            <PrismicLink document={casestudy}>
              <Image
                src={casestudy.data.contentImage.url ?? ''}
                alt={casestudy.data.contentImage.alt ?? ''}
                width={1248}
                height={650}
                layout="responsive"
                quality={100}
              />
            </PrismicLink>
            <div className="mt-20 grid grid-cols-12  gap-16 md:grid-cols-12 md:gap-8">
              <div className="col-span-6 col-start-3">
                <div className="mb-8 font-FiraCode_SemiBold text-codeMDSemiBold font-semibold text-primary-100 dark:text-blue-100">
                  {casestudy.data.workpagePrefix}
                </div>
                <PrismicLink document={casestudy}>
                  <div className="font-ABCWhyteEdu_Heavy text-header2 font-extrabold text-neutral-100 hover:text-neutral-50 dark:text-neutral-0 dark:hover:text-neutral-30">
                    {casestudy.data.workpageTitle}
                  </div>
                </PrismicLink>
                <div className="mb-40 mt-12 inline-block">
                  <span className="font-ABCWhyteEdu_Medium text-header4 font-semibold tracking-[0.02em] text-neutral-100 dark:text-neutral-0">
                    {casestudy.data.workpageDescriptionBold}

                    <span className="ml-2 font-ABCWhyteEdu_Medium text-header4 font-semibold tracking-[0.02em] text-neutral-30 dark:text-neutral-30">
                      {casestudy.data.workpageDescriptionRegular}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Container>
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
