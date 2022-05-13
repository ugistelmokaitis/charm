import type { GetStaticProps } from 'next';
import type { FC } from 'react';
import { PrismicRichText } from '@prismicio/react';
import { asText } from '@prismicio/helpers';
import Image from 'next/image';
import Layout from '../components/layout';
import { docResolver, getPage } from '../utils/prismic';
import type { NotFoundProps } from '../types/notfound';
import type { SettingsProps } from '../types/settings';
import Container from '../components/container';
import Button from '../components/button';
import ArrowIcon from '../public/icons/arrowIcon.svg';

type INotFound = {
  data: NotFoundProps['data'];
  settings: SettingsProps;
};

const Custom404: FC<INotFound> = ({ data, settings }) => (
  <Layout title="" description="" settings={settings}>
    <div className="flex bg-neutral-0 selection:bg-primary-50 selection:text-neutral-100 dark:bg-neutral-100 lg:grid-cols-12">
      <Container>
        <div className="grid-starts-1 text-white-100 grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-8">
          <div className="pt-56 md:col-span-12">
            <div className="mb-6 flex items-center justify-center xl:mb-12">
              <p className="font-FiraCode_SemiBold text-codeMDSemiBold font-semibold text-primary-100 dark:text-blue-100">
                {data.introPrefix}
              </p>
            </div>
            <div className="flex items-center justify-center">
              <p className="font-ABCWhyteEdu_Heavy text-[8.125rem] font-bold leading-[123.5px] tracking-[0.02em] text-neutral-100 dark:text-neutral-0 md:text-[15rem] md:leading-[228px]">
                {data.introTitle}
              </p>
            </div>
            <div className="mb-12 mt-6 flex items-center justify-center text-center xl:mb-20">
              <p className="font-ABCWhyteEdu_Medium text-pSMSemiBold font-semibold text-neutral-100 dark:text-neutral-0">
                {data.introDescription}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Button
            href={`${docResolver(data.primaryButtonLink)}`}
            variant="secondary"
          >
            {data.primaryButtonLabel}
            <ArrowIcon className="ml-2" />
          </Button>
        </div>
      </Container>
    </div>
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  const { data } = (await getPage('notfound')) as NotFoundProps;
  const settings = (await getPage('settings')) as SettingsProps;

  return {
    props: {
      data,
      settings,
    },
  };
};

export default Custom404;