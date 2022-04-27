import type { GetStaticProps } from 'next';
import type { FC } from 'react';
import { useState } from 'react';
import type { JSXMapSerializer } from '@prismicio/react';
import { PrismicRichText } from '@prismicio/react';
import { asText } from '@prismicio/helpers';
import { useWindowScroll } from 'react-use';
import Layout from '../components/layout';
import { getPage, getPages } from '../utils/prismic';
import type { HomeProps } from '../types/home';
import type { SettingsProps } from '../types/settings';
import Container from '../components/container';
import BadgeButton from '../components/badgeButton';
import Window from '../components/window';
import type { ExperienceProps } from '../types/experience';
import richTextComponents from '../components/richTextComponents';

type IHome = {
  data: HomeProps['data'];
  settings: SettingsProps;
  experience: ExperienceProps['data'];
};

const sliderComponents: JSXMapSerializer = {
  ...richTextComponents,
  heading3: ({ children, key }) => (
    <h3
      key={key}
      className="whitespace-nowrap font-ABCWhyteEdu_Heavy text-header3 font-extrabold"
    >
      {children}
    </h3>
  ),
};

const Home: FC<IHome> = ({ data, settings, experience }) => {
  const firstHalf = [...data.skills];
  const half = Math.ceil(firstHalf.length / 2);
  const secondHalf = firstHalf.splice(0, half);

  const { y: scrollY } = useWindowScroll();

  return (
    <Layout title="" description="" settings={settings}>
      <div className="flex bg-neutral-0 selection:bg-primary-50 selection:text-neutral-100 dark:bg-neutral-100">
        <Container>
          <div className="grid-starts-1 grid grid-cols-12 gap-16">
            <div className="col-span-8 col-start-3 pt-32 text-center">
              <BadgeButton />

              <div className="mx-auto items-center pt-12 font-ABCWhyteEdu_Heavy text-display font-extrabold text-neutral-100">
                {asText(data.heroGreetingTitle)}
              </div>
              <div className="mx-auto max-w-[60rem] items-center pb-12 font-ABCWhyteEdu_Heavy text-display font-extrabold text-neutral-100">
                {asText(data.heroNameTitle)}
              </div>
              <div className="mx-auto max-w-[39rem] pb-12 font-ABCWhyteEdu_Medium text-pMDSemiBold font-semibold tracking-[0.02em] text-neutral-50">
                {asText(data.heroDescription)}
              </div>
            </div>
          </div>

          <Window />
          <div className="mt-52">
            <PrismicRichText field={data.experienceTitle} />
          </div>
          <div className="mt-20 flex">
            {/* {data.company.map(
              (
                {
                  companyResponsibilities,
                  companyRole,
                  companyTitle,
                  companyToolsUsed,
                  companyYear,
                },
                index
              ) => (
                <div className="block" key={index}>
                  <div className="">
                    <PrismicRichText field={companyTitle} />
                    <PrismicRichText field={companyRole} />
                  </div>
                  <PrismicRichText field={companyYear} />
                  <PrismicRichText field={companyResponsibilities} />
                  <PrismicRichText field={companyToolsUsed} />
                </div>
              )
            )} */}
          </div>
        </Container>
      </div>

      <div className="block overflow-hidden bg-neutral-0 selection:bg-primary-50 selection:text-neutral-100 ">
        <div>
          <div className="mb-28 flex items-center justify-center">
            <PrismicRichText field={data.skillsTitle} />
          </div>
          <div className="flex text-neutral-30">
            {firstHalf.map(({ skill }, index) => (
              <div
                key={index}
                className="flex pr-4"
                style={{ transform: `translateX(${scrollY / 3}px)` }}
              >
                <PrismicRichText field={skill} components={sliderComponents} />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex text-neutral-30">
            {secondHalf.map(({ skill }, index) => (
              <div
                key={index}
                className="pr-4"
                style={{ transform: `translateX(-${scrollY / 2}px)` }}
              >
                <PrismicRichText field={skill} key={index} />
              </div>
            ))}
          </div>
        </div>

        <div className="pb-52" />
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = (await getPage('home')) as HomeProps;
  const settings = (await getPage('settings')) as SettingsProps;
  const experience = (await getPages('experience')) as ExperienceProps[];

  return {
    props: {
      data,
      settings,
      experience,
    },
  };
};

export default Home;
