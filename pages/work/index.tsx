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
  <Layout
    title={data.titleTag}
    description={data.metaDescription}
    settings={settings}
  >
    <Container>
      <div className="grid-starts-1 gap-8 pt-[10.875rem] sm:gap-12 md:grid-cols-12 lg:grid lg:pt-56">
        <div className="col-span-4 mb-20 lg:mb-28">
          <PrismicRichText field={data.introTitle} />
        </div>
      </div>
    </Container>
    <div>
      <Container>
        <div className="grid grid-cols-1 gap-y-12 gap-x-4 sm:grid-cols-2">
          {casestudies.map((casestudy, index) => (
            <div
              key={index}
              className="group rounded-lg p-4 hover:bg-neutral-0 hover:shadow-sm dark:hover:bg-neutral-80"
            >
              <div className="lg:pt-4">
                <PrismicLink document={casestudy}>
                  <div className="overflow-hidden rounded-t-lg rounded-b-lg">
                    <Image
                      src={casestudy.data.contentImage.url ?? ''}
                      alt={casestudy.data.contentImage.alt ?? ''}
                      width={515}
                      height={242}
                      layout="responsive"
                      quality={100}
                      priority
                    />
                  </div>
                  <h2 className="ABCWhyteEdu-Medium mt-8 flex items-center align-middle text-pm2 font-medium text-neutral-100 dark:text-neutral-0 sm:text-pm1">
                    {casestudy.data.companyName}
                  </h2>
                  <div className="mt-4 flex items-center">
                    <p className=" ABCWhyteEdu-Book text-pm3  font-[350] text-neutral-65 dark:text-neutral-15 sm:text-pm2">
                      {casestudy.data.aboutCompany}
                    </p>
                  </div>
                </PrismicLink>
              </div>
            </div>
          ))}
        </div>
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
