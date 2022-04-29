import type { GetStaticProps } from 'next';
import type { FC } from 'react';
import { useRef, useState } from 'react';
import type { JSXMapSerializer } from '@prismicio/react';
import { PrismicRichText } from '@prismicio/react';
import { asText } from '@prismicio/helpers';
import { useWindowScroll, useWindowSize } from 'react-use';
import { useMeasure } from '@react-hookz/web';
import Layout from '../components/layout';
import { docResolver, getPage, getPages, linkResolver } from '../utils/prismic';
import type { HomeProps } from '../types/home';
import type { SettingsProps } from '../types/settings';
import Container from '../components/container';
import BadgeButton from '../components/badgeButton';
import EditorWindow from '../components/editorWindow';
import richTextComponents from '../components/richTextComponents';

type IHome = {
  data: HomeProps['data'];
  settings: SettingsProps;
};

const sliderComponents: JSXMapSerializer = {
  ...richTextComponents,
  heading3: ({ children, key }) => (
    <h3
      key={key}
      className="whitespace-nowrap font-ABCWhyteEdu_Heavy text-header3 font-extrabold text-neutral-30"
    >
      {children}
    </h3>
  ),
};

const Home: FC<IHome> = ({ data, settings }) => {
  const firstHalf = [...data.skills];
  const half = Math.ceil(firstHalf.length / 2);
  const secondHalf = firstHalf.splice(0, half);
  const [activeExperience, setActiveExperience] = useState(0);
  const slider = useRef<HTMLDivElement>(null);
  const { y: scrollY } = useWindowScroll();
  const scrollPos = slider.current?.offsetTop ?? 0;
  const windowSize = useWindowSize();
  const diff = (scrollY - (scrollPos - windowSize.height / 2)) / 2;
  return (
    <Layout title="" description="" settings={settings}>
      <div className="flex bg-neutral-0 selection:bg-primary-50 selection:text-neutral-100 dark:bg-neutral-100">
        <Container>
          <div className="grid-starts-1 grid grid-cols-12 gap-16">
            <div className="col-span-8 col-start-3 pt-32 text-center">
              <BadgeButton
                href={`${docResolver(data.badgeButtonLink)}`}
                child1={data.badgeButtonPrefix}
                child2={data.badgeButtonLabel}
              />

              <div className="mx-auto items-center pt-12 font-ABCWhyteEdu_Heavy text-display font-extrabold text-neutral-100 dark:text-neutral-0">
                {data.heroGreetingTitle}
              </div>
              <div className="mx-auto mt-4 max-w-[60rem] items-center pb-12 font-ABCWhyteEdu_Heavy text-display font-extrabold text-neutral-100 dark:text-neutral-0">
                {data.heroNameTitle}
              </div>
              <div className="mx-auto max-w-[39rem] font-ABCWhyteEdu_Medium text-pMDSemiBold font-semibold tracking-[0.02em] text-neutral-50 dark:text-neutral-15">
                {data.heroDescription}
              </div>
            </div>
          </div>

          <EditorWindow />
          <div className="mt-52">
            <PrismicRichText field={data.experienceTitle} />
          </div>
          <div className="mt-28 grid ">
            <div className="grid grid-cols-12 gap-16">
              <div className="col-span-4 col-start-1 block">
                {data.company.map(({ companyRole, companyName }, index) => (
                  <div
                    key={index}
                    onClick={() => setActiveExperience(index)}
                    onKeyDown={() => setActiveExperience(index)}
                    role="button"
                    tabIndex={0}
                    className={` ${
                      activeExperience === index
                        ? 'rounded-lg bg-primary-5 dark:bg-neutral-80'
                        : 'bg-neutral-0 dark:bg-neutral-100'
                    }`}
                  >
                    <div className="px-8 py-8">
                      <div className="font-FiraCode_SemiBold text-codeLGSemiBold font-semibold text-neutral-100 dark:text-neutral-0">
                        {companyName}
                      </div>
                      <div className="font-codeRegular mt-2 font-FiraCode_Regular text-codeMDRegular text-neutral-100 dark:text-neutral-0">
                        {companyRole}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-span-6 col-start-7">
                <div className="pb-4 font-FiraCode_SemiBold text-codeMDSemiBold font-semibold text-primary-100 dark:text-blue-100">
                  {data.company[activeExperience].companyYear}
                </div>
                <div className="inline-block">
                  <span className="font-ABCWhyteEdu_Medium text-header4 font-semibold tracking-[0.02em] text-neutral-100 dark:text-neutral-0">
                    {data.company[activeExperience].companyResponsibilities}

                    <span className="ml-2 font-ABCWhyteEdu_Medium text-header4 font-semibold tracking-[0.02em] text-neutral-30 dark:text-neutral-30">
                      {data.company[activeExperience].companyTools}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <div
        className="block overflow-hidden bg-neutral-0 selection:bg-primary-50 selection:text-neutral-100 dark:bg-neutral-100"
        ref={slider}
      >
        <div className="mx-auto mt-52 flex max-w-[35rem] items-center justify-center pb-28 text-center">
          <PrismicRichText field={data.skillsTitle} />
        </div>
        <div
          className="flex text-neutral-30"
          style={{ transform: `translateX(${diff - windowSize.width / 7}px)` }}
        >
          {firstHalf.map(({ skill }, index) => (
            <div key={index} className="flex pr-4 pb-8">
              <PrismicRichText field={skill} components={sliderComponents} />
            </div>
          ))}
        </div>
        <div
          className="text-neutral-40 flex"
          style={{
            transform: `translateX(${-diff - windowSize.width / 7}px)`,
          }}
        >
          {secondHalf.map(({ skill }, index) => (
            <div key={index} className="pr-4">
              <PrismicRichText
                field={skill}
                key={index}
                components={sliderComponents}
              />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = (await getPage('home')) as HomeProps;
  const settings = (await getPage('settings')) as SettingsProps;

  return {
    props: {
      data,
      settings,
    },
  };
};

export default Home;
