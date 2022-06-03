import type { GetStaticProps } from 'next';
import type { FC } from 'react';
import { useRef, useState } from 'react';
import type { JSXMapSerializer } from '@prismicio/react';
import { PrismicRichText } from '@prismicio/react';
import { useWindowScroll, useWindowSize } from 'react-use';
import Image from 'next/image';
import Layout from '../components/layout';
import { docResolver, getPage } from '../utils/prismic';
import type { HomeProps } from '../types/home';
import type { SettingsProps } from '../types/settings';
import Container from '../components/container';
import BadgeButton from '../components/badgeButton';
import BrowserWindow from '../components/browserWindow';
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
      className="whitespace-nowrap font-ABCWhyteEdu-Heavy text-5xl font-extrabold text-neutral-30 sm:text-3xl"
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
    <Layout
      title={data.titleTag}
      description={data.metaDescription}
      settings={settings}
    >
      <div className="flex bg-neutral-0 selection:bg-primary-50 selection:text-neutral-100 dark:bg-neutral-100">
        <Container>
          <div>
            <div className="col-span-8 col-start-3 pt-56 text-center lg:pt-[14.25rem]">
              <BadgeButton
                href={`${docResolver(data.badgeButtonLink)}`}
                child1={data.badgeButtonPrefix}
                child2={data.badgeButtonLabel}
              />
              <div className="mx-auto items-center pt-12 font-ABCWhyteEdu-Heavy text-4xl font-bold tracking-[0.02em] text-neutral-100 dark:text-neutral-0  sm:text-2xl md:text-1xl">
                {data.heroGreetingTitle}
              </div>
              <div className="mx-auto mt-4 items-center pb-12 font-ABCWhyteEdu-Heavy text-4xl font-bold tracking-[0.02em] text-neutral-100 dark:text-neutral-0  sm:text-2xl md:text-1xl">
                {data.heroNameTitle}
              </div>
              <div className="mx-auto max-w-[39rem] font-ABCWhyteEdu-Medium text-pSMSemiBold font-semibold text-neutral-50 dark:text-neutral-15 sm:text-pMDSemiBold">
                {data.heroDescription}
              </div>
            </div>
          </div>

          <BrowserWindow
            child1={data.editorWindowTabTitle}
            child2={data.editorWindowContent}
          />
          <div className="mt-52">
            <PrismicRichText field={data.experienceTitle} />
          </div>
          <div className="mt-12 lg:mt-28 lg:grid ">
            <div className="gap-8 md:grid-cols-12 lg:grid lg:pt-20">
              <div className="col-span-4 col-start-1 block">
                {data.company.map(
                  ({ companyRole, companyName, companyLogo }, index) => (
                    <div
                      key={index}
                      onClick={() => setActiveExperience(index)}
                      onKeyDown={() => setActiveExperience(index)}
                      role="button"
                      tabIndex={0}
                      className={` ${
                        activeExperience === index
                          ? 'rounded-lg bg-primary-25 dark:bg-neutral-80'
                          : 'bg-neutral-0 dark:bg-neutral-100'
                      }`}
                    >
                      <div className="flex  items-center px-8">
                        <Image
                          src={companyLogo.url ?? ''}
                          alt={companyLogo.alt ?? ''}
                          width={62}
                          height={62}
                          layout="fixed"
                          quality={100}
                          className="dark:brightness-0 dark:invert-[1]"
                        />
                        <div className="ml-8 py-8">
                          <div className="font-ABCWhyteEdu-Medium text-pMDSemiBold font-normal tracking-[0.02em] text-neutral-100  dark:text-neutral-0 sm:text-pLGSemiBold">
                            {companyName}
                          </div>
                          <div className="font-codeRegular mt-2 font-FiraCode-Regular text-codeMDRegular text-neutral-50 dark:text-neutral-15">
                            {companyRole}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
              <div className="col-span-6 col-start-7 mt-12">
                <div className="pb-4 font-FiraCode-SemiBold text-codeMDSemiBold font-semibold text-primary-100 dark:text-blue-100">
                  {data.company[activeExperience].companyYear}
                </div>
                <div className="inline-block">
                  <span className="font-ABCWhyteEdu-Medium text-pMDSemiBold font-semibold text-neutral-100 dark:text-neutral-0 sm:text-5xl">
                    {data.company[activeExperience].companyResponsibilities}

                    <span className="ml-2 font-ABCWhyteEdu-Medium text-pMDSemiBold font-semibold text-neutral-30 dark:text-neutral-30 sm:text-5xl">
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
        <div className="mx-auto mt-28 flex max-w-[35rem] items-center justify-center pb-28 text-center lg:mt-52">
          <PrismicRichText field={data.skillsTitle} />
        </div>
        <div className="flex max-w-full flex-row items-stretch overflow-x-auto md:flex-col md:overflow-x-visible">
          <div
            className="flex text-neutral-30"
            style={{
              transform:
                windowSize.width < 768
                  ? ''
                  : `translateX(${diff - windowSize.width / 5}px)`,
            }}
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
              transform:
                windowSize.width < 768
                  ? ''
                  : `translateX(${-diff - windowSize.width / 20}px)`,
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
