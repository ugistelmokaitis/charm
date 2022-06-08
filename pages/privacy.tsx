import type { GetStaticProps } from 'next';
import type { FC } from 'react';
import { PrismicRichText } from '@prismicio/react';
import type { JSXMapSerializer } from '@prismicio/react';
import Layout from '../components/layout';
import { getPage } from '../utils/prismic';
import type { PrivacyProps } from '../types/privacy';
import type { SettingsProps } from '../types/settings';
import Container from '../components/container';
import richTextComponents from '../components/richTextComponents';

type IPrivacy = {
  data: PrivacyProps['data'];
  settings: SettingsProps;
};

const introComponents: JSXMapSerializer = {
  ...richTextComponents,
  paragraph: ({ children, key, ...props }) => (
    <p
      key={key}
      className="ABCWhyteEdu-Book inline text-pm3 font-[350] text-neutral-100 dark:text-neutral-15 sm:text-pm2"
      {...props}
    >
      {children}
    </p>
  ),
};

const Privacy: FC<IPrivacy> = ({ data, settings }) => (
  <Layout
    title={data.titleTag}
    description={data.metaDescription}
    settings={settings}
  >
    <div className="flex bg-neutral-0 selection:bg-primary-50 selection:text-neutral-100 dark:bg-neutral-100 lg:grid-cols-12">
      <Container>
        <div className=" text-white-100 grid-cols-1 gap-16 md:grid md:grid-cols-12 md:gap-8">
          <div className="col-span-4 pt-56 md:col-span-9 lg:col-span-7">
            <PrismicRichText field={data.introTitle} />
            <div className="mb-12 mt-12">
              <p className="text-pSMSemiBold sm:text-pMDSemiBold font-ABCWhyteEdu-Medium font-normal tracking-[0.02em] text-neutral-100 dark:text-neutral-15">
                {data.introDescription}
              </p>
            </div>
            <div className="mb-2 mt-2">
              <p className="font-codeRegular text-codeMDRegular font-FiraCode-Regular text-neutral-100 dark:text-neutral-0">
                {data.IntroDateTitle}
              </p>
            </div>
            <div className="mb-20">
              <p className="font-codeRegular text-codeMDRegular font-FiraCode-Regular text-neutral-100 dark:text-neutral-0">
                {data.introLastUpdate}
              </p>
            </div>
            <div className="text-neutral-15">
              <PrismicRichText
                field={data.contentDescription}
                components={introComponents}
              />
            </div>
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
