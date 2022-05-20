import type { GetStaticProps } from 'next';
import type { FC } from 'react';
import { PrismicLink, PrismicRichText } from '@prismicio/react';
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
    <div className="flex bg-neutral-0 selection:bg-primary-50 selection:text-neutral-100 dark:bg-neutral-100">
      <Container>
        <div className="grid-starts-1 gap-16 pt-56 md:grid-cols-12 md:gap-8 lg:grid">
          <div className="col-span-4">
            <PrismicRichText field={data.introTitle} />
          </div>
        </div>
        {casestudies.map((casestudy, index) => (
          <div key={index} className="pt-20 lg:pt-28">
            <PrismicLink document={casestudy}>
              <Image
                src={casestudy.data.contentImage.url ?? ''}
                alt={casestudy.data.contentImage.alt ?? ''}
                width={1248}
                height={650}
                layout="responsive"
                priority
                quality={100}
              />
            </PrismicLink>
            <div className="mt-12 gap-16 md:grid-cols-12 lg:grid">
              <div className="col-span-6 col-start-3">
                <div className="mb-8 font-FiraCode-SemiBold text-codeMDSemiBold font-semibold text-primary-100 dark:text-blue-100">
                  {casestudy.data.workpagePrefix}
                </div>
                <PrismicLink document={casestudy}>
                  <div className="font-ABCWhyteEdu-Heavy text-5xl font-bold tracking-[0.02em] text-neutral-100 hover:text-neutral-50 dark:text-neutral-0 dark:hover:text-neutral-30 lg:text-3xl">
                    {casestudy.data.workpageTitle}
                  </div>
                </PrismicLink>
                <div className="mt-8 inline-block lg:mt-12">
                  <span className="font-ABCWhyteEdu-Medium  text-pSMSemiBold font-normal tracking-[0.02em] text-neutral-100 dark:text-neutral-0 lg:text-pLGSemiBold">
                    {casestudy.data.workpageDescriptionBold}

                    <span className=" text-neutral-30 dark:text-neutral-30">
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
