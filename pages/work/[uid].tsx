import type { GetStaticPaths, GetStaticProps } from 'next';
import type { FC } from 'react';
import { Fragment } from 'react';
import type { SliceZoneProps, SliceZoneComponents } from '@prismicio/react';
import { PrismicLink, PrismicRichText, SliceZone } from '@prismicio/react';
import Image from 'next/image';
import { format, parse } from 'date-fns';
import Layout from '../../components/layout';
import { getPage, getPages } from '../../utils/prismic';
import { components } from '../../slices';
import type { SettingsProps } from '../../types/settings';
import type { CaseStudyProps } from '../../types/casestudy';
import Container from '../../components/container';
import Button from '../../components/button';

type ICaseStudy = {
  settings: SettingsProps;
  data: CaseStudyProps['data'];
  slices2: SliceZoneProps['slices'];
  nextArticle: string | null;
  uid: string;
};

const CaseStudy: FC<ICaseStudy> = ({ data, settings, nextArticle, uid }) => (
  <Layout
    title={data.titleTag}
    description={data.metaDescription}
    settings={settings}
  >
    <div className="overflow-hidden bg-neutral-0 dark:bg-neutral-100">
      <Container>
        <div className="gap-5 pt-[8.5rem] md:grid-cols-12 lg:grid lg:pt-44">
          <div className="col-span-12 flex items-center justify-center lg:text-center">
            <PrismicRichText field={data.contentTitle} />
          </div>
          <div className="col-span-10 col-start-2 flex justify-start pt-12  md:pt-7 lmd:justify-center lg:mt-0">
            {data.author.map(
              ({ image, name, country, twitterUsername }, index) => (
                <Fragment key={index}>
                  <div className="relative flex">
                    <PrismicLink
                      href={`https://www.twitter.com/${twitterUsername}`}
                    >
                      <div className="rounded-full bg-gradient-to-tr from-[#60BDF5] to-[#1DA1F2] p-[2px] transition">
                        <div className="flex self-start rounded-full bg-neutral-0 p-[2px]">
                          <Image
                            src={image.url ?? ''}
                            alt={image.alt ?? ''}
                            width={45}
                            height={45}
                            layout="fixed"
                            quality={100}
                            priority
                          />
                        </div>
                      </div>
                    </PrismicLink>
                    <div className="block pl-4 md:text-left">
                      <p className="font-codeRegular font-FiraCode_Regular text-[16px] text-neutral-100 dark:text-neutral-0">
                        {name}
                      </p>
                      <p className="font-codeRegular font-FiraCode_Regular text-[16px] text-neutral-50 dark:text-neutral-30">
                        {country}
                      </p>
                    </div>
                  </div>
                </Fragment>
              )
            )}
          </div>
          <div className="col-span-12 flex justify-start lmd:justify-center">
            <div className="block items-center sm:gap-8 md:pt-7 lmd:items-center lg:flex lg:items-baseline">
              <div className="sm:flex sm:items-baseline sm:gap-8">
                <div className="mt-12 flex items-center lg:mt-0">
                  <p className="ABCWhyteEdu-Medium pr-2 font-medium text-neutral-100 dark:text-neutral-0">
                    When:
                  </p>
                  <p className="ABCWhyteEdu-Medium font-[350] text-neutral-65 dark:text-neutral-15">
                    {format(
                      parse(data.date, 'yyyy-MM-dd', new Date()),
                      'MMMM, yyyy'
                    )}
                  </p>
                </div>
                <div className="mt-4 flex items-center">
                  <p className="ABCWhyteEdu-Medium pr-2 font-medium text-neutral-100 dark:text-neutral-0">
                    Role:
                  </p>
                  <p className="ABCWhyteEdu-Medium font-[350] text-neutral-65 dark:text-neutral-15">
                    {data.role}
                  </p>
                </div>
              </div>
              <div className="items-center 1xs:flex 1xs:items-baseline">
                <div className="flex items-center">
                  <p className="ABCWhyteEdu-Medium mb-4 mt-4 pr-2 font-medium text-neutral-100 dark:text-neutral-0 1xs:mb-0">
                    Technology:
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  {data.technology.map(({ title }, index) => (
                    <div key={index}>
                      <div className="rounded-[2.25rem] bg-primary-25 px-4 py-1 dark:bg-neutral-65 dark:text-neutral-15">
                        <p className="ABCWhyteEdu-Medium  text-[14px] font-[350] leading-[20px] text-neutral-65 dark:bg-neutral-65 dark:text-neutral-0">
                          {title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-10 col-start-2  mt-[3.75rem] sm:mt-[5.75rem]">
            <Image
              src={data.contentImage.url ?? ''}
              alt={data.contentImage.alt ?? ''}
              width={1032}
              height={648}
              layout="responsive"
              quality={100}
            />
          </div>
          <SliceZone
            slices={data.slices2}
            components={components as unknown as SliceZoneComponents}
          />
        </div>
      </Container>
    </div>
    <Container>
      {nextArticle && nextArticle !== uid && (
        <div className="mt-[5rem] flex items-center justify-center">
          <div className="col-span-12  mt-20 flex justify-center sm:mt-28">
            <Button href={`/work/${nextArticle}`} variant="casestudy">
              Next case study
            </Button>
          </div>
        </div>
      )}
      {!nextArticle && (
        <div className="mt-[5rem] flex items-center justify-center">
          <div className="col-span-12  mt-20 flex justify-center sm:mt-28">
            <Button href="/work" variant="casestudy">
              Back to work page
            </Button>
          </div>
        </div>
      )}
    </Container>
  </Layout>
);

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = (await getPage(
    params?.uid as string,
    'casestudy'
  )) as CaseStudyProps;
  const settings = (await getPage('settings')) as SettingsProps;
  const caseStudies = await getPages('casestudy');

  const currentIndex = caseStudies.findIndex(({ uid }) => uid === params?.uid);
  const nextArticle =
    currentIndex === caseStudies.length - 1
      ? null
      : caseStudies[currentIndex + 1].uid;

  return {
    props: {
      data,
      settings,
      nextArticle,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const casestudies = (await getPages('casestudy')) as CaseStudyProps[];

  const paths = casestudies.map(({ uid }) => ({
    params: {
      uid,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default CaseStudy;
