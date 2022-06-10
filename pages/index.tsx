import type { GetStaticProps } from 'next';
import type { FC } from 'react';
import { useRef, useState } from 'react';
import type { JSXMapSerializer } from '@prismicio/react';
import { PrismicRichText } from '@prismicio/react';
import { useWindowScroll, useWindowSize } from 'react-use';
import Image from 'next/image';
import { asText } from '@prismicio/helpers';
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
      className="ABCWhyteEdu-Medium whitespace-nowrap text-4xl font-bold tracking-[0.02em] text-neutral-65 dark:text-neutral-30 sm:text-3xl lg:text-2xl"
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
      <Container>
        <div>
          <div className="col-span-8 col-start-3 pt-[152px] text-center lg:pt-52">
            <BadgeButton
              href={`${docResolver(data.badgeButtonLink)}`}
              child1={data.badgeButtonPrefix}
              child2={data.badgeButtonLabel}
            />
            <h1 className="ABCWhyteEdu-Bold mx-auto mt-12 items-center text-2xl font-bold tracking-[0.02em] text-neutral-100 dark:text-neutral-0 sm:text-1xl lg:text-xl">
              {data.heroGreetingTitle}
            </h1>
            <div className="group mx-auto items-center">
              <h1 className="ABCWhyteEdu-Bold text-2xl font-bold tracking-[0.02em] text-neutral-100 dark:text-neutral-0 sm:text-1xl lg:text-xl">
                <h1 className="inline-flex h-[100px] animate-type overflow-x-hidden whitespace-nowrap pt-2 text-neutral-100 will-change-transform dark:text-neutral-0 lg:h-[118px]">
                  {data.heroNameTitle}
                </h1>
                <span className="ml-1 -mb-2 box-border inline-block h-14 w-1 animate-blink bg-primary-50 will-change-transform dark:bg-neutral-50 sm:h-16 md:-mb-4 md:h-[80px] lg:h-[115px]" />
              </h1>

              <p className="ABCWhyteEdu-Book mx-auto mt-12 max-w-[39rem] text-pm3 font-[350] text-neutral-65 dark:text-neutral-15 sm:text-pm2">
                {data.heroDescription}
              </p>
            </div>
          </div>
        </div>

        <BrowserWindow
          child1={data.editorWindowTabTitle}
          child2={data.editorWindowContent}
        />
        <div className="mt-[3.875rem] lg:mt-[5.875rem]">
          <h2 className=" ABCWhyteEdu-Medium text-3xl font-bold tracking-[0.02em] text-neutral-0 dark:text-neutral-0 sm:text-2xl lg:text-1xl">
            {asText(data.experienceTitle)}
          </h2>
        </div>
        <div className="mt-12 lg:mt-28 lg:grid ">
          <div className="gap-8 md:grid-cols-12 lg:grid lg:pt-20">
            <div className="col-span-5 col-start-1 block">
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
                    <div className="flex items-center px-8 ">
                      <Image
                        src={companyLogo.url ?? ''}
                        alt={companyLogo.alt ?? ''}
                        width={62}
                        height={62}
                        layout="fixed"
                        quality={100}
                        className="dark:brightness-0 dark:invert-[1]"
                      />
                      <div className="ml-8 py-6">
                        <h3 className=" ABCWhyteEdu-Medium text-pm2 font-medium text-neutral-100 dark:text-neutral-0 sm:text-pm1">
                          {companyName}
                        </h3>
                        <p className="font-codeRegular font-FiraCode_Regular mt-2 text-cs2 font-normal text-neutral-65 dark:text-neutral-15">
                          {companyRole}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="col-span-6 col-start-7 mt-12">
              <p className="font-FiraCode_SemiBold pb-4 text-cs2 font-semibold text-primary-100 dark:text-blue-100">
                {data.company[activeExperience].companyYear}
              </p>
              <div className="inline-block">
                <span className="ABCWhyteEdu-Book text-pm3  font-[350] text-neutral-100  dark:text-neutral-0 sm:text-pm2">
                  {data.company[activeExperience].companyResponsibilities}

                  <span className="text-pMDSemiBold ABCWhyteEdu-Book ml-2 text-pm3  font-[350] text-neutral-65  dark:text-neutral-30 sm:text-pm2">
                    {data.company[activeExperience].companyTools}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div
        className="block overflow-hidden bg-neutral-0 selection:bg-primary-50 selection:text-neutral-100 dark:bg-neutral-100"
        ref={slider}
      >
        <div className="mx-auto mt-28 flex max-w-[35rem] items-center justify-center pb-12 text-center lg:mt-36 lg:pb-20">
          <h2 className=" ABCWhyteEdu-Medium text-3xl font-bold tracking-[0.02em] text-neutral-0 dark:text-neutral-0 sm:text-2xl lg:text-1xl">
            {asText(data.skillsTitle)}
          </h2>
        </div>
        <div className="flex max-w-full flex-row items-stretch overflow-x-auto md:flex-col md:overflow-x-visible">
          <div
            className="flex whitespace-nowrap text-neutral-30"
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
